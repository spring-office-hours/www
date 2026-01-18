import type { H3Event } from 'h3'

const NOTION_API_BASE = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

export interface PotluckQuestionSubmission {
  question: string
  name: string
  contact: string
}

export interface ScheduleItem {
  id: string
  episodeCode: string
  title: string
  date: string
  guests: string
  status: string
}

export async function getNotionConfig(event: H3Event) {
  const config = useRuntimeConfig(event)

  if (!config.notionApiKey) {
    throw createError({
      statusCode: 500,
      message: 'Notion API key not configured',
    })
  }

  return {
    apiKey: config.notionApiKey,
    scheduleDbId: config.notionScheduleDbId,
    potluckDbId: config.notionPotluckDbId,
  }
}

export async function submitPotluckQuestion(
  event: H3Event,
  data: PotluckQuestionSubmission
): Promise<{ success: boolean; id?: string }> {
  const { apiKey, potluckDbId } = await getNotionConfig(event)

  if (!potluckDbId) {
    throw createError({
      statusCode: 500,
      message: 'Notion Potluck database ID not configured',
    })
  }

  const response = await $fetch<{ id: string }>(`${NOTION_API_BASE}/pages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: {
      parent: { database_id: potluckDbId },
      properties: {
        Question: {
          title: [{ text: { content: data.question } }],
        },
        Name: {
          rich_text: [{ text: { content: data.name } }],
        },
        Contact: {
          rich_text: [{ text: { content: data.contact } }],
        },
      },
    },
  })

  return { success: true, id: response.id }
}

export async function fetchSchedule(event: H3Event): Promise<ScheduleItem[]> {
  const { apiKey, scheduleDbId } = await getNotionConfig(event)

  if (!scheduleDbId) {
    throw createError({
      statusCode: 500,
      message: 'Notion Schedule database ID not configured',
    })
  }

  const response = await $fetch<{
    results: Array<{
      id: string
      properties: {
        Title: { title: Array<{ plain_text: string }> }
        Date: { date: { start: string } | null }
        'Guest(s)': { rich_text: Array<{ plain_text: string }> }
      }
    }>
  }>(`${NOTION_API_BASE}/databases/${scheduleDbId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: {
      filter: {
        property: 'Status',
        select: {
          equals: 'Scheduled',
        },
      },
      sorts: [
        { property: 'Date', direction: 'ascending' },
      ],
    },
  })

  return response.results.map((page) => {
    // Handle Guest(s) which may be rich_text, people, multi_select, or relation type
    const guestProp = page.properties['Guest(s)'] as any
    let guests = ''
    if (guestProp?.rich_text?.length) {
      guests = guestProp.rich_text.map((t: any) => t.plain_text).join('')
    } else if (guestProp?.people?.length) {
      guests = guestProp.people.map((p: any) => p.name).join(', ')
    } else if (guestProp?.multi_select?.length) {
      guests = guestProp.multi_select.map((s: any) => s.name).join(', ')
    } else if (guestProp?.relation?.length) {
      // For relations, we'd need to fetch the related pages - just show count for now
      guests = `${guestProp.relation.length} guest(s)`
    }

    return {
      id: page.id,
      episodeCode: (page.properties.SE as any)?.rich_text?.[0]?.plain_text || '',
      title: page.properties.Title?.title?.[0]?.plain_text || 'TBD',
      date: page.properties.Date?.date?.start || '',
      guests,
      status: (page.properties.Status as any)?.select?.name || '',
    }
  })
}
