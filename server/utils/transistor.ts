import type { H3Event } from 'h3'

export interface TransistorEpisode {
  id: string
  type: string
  attributes: {
    title: string
    number: number
    season: number
    status: string
    published_at: string
    duration: number
    duration_in_mmss: string
    summary: string
    description: string
    media_url: string
    image_url: string
    share_url: string
    embed_html: string
    embed_html_dark: string
    transcript_url: string | null
    video_url: string | null
    formatted_published_at: string
    slug: string
  }
}

export interface TransistorResponse {
  data: TransistorEpisode[]
  meta: {
    currentPage: number
    totalPages: number
    totalCount: number
  }
}

export interface TransistorShowResponse {
  data: {
    id: string
    attributes: {
      title: string
      description: string
      image_url: string
      author: string
      website: string
    }
  }
}

const TRANSISTOR_API_BASE = 'https://api.transistor.fm/v1'

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }
  return `${minutes}m ${secs}s`
}

const SHOW_INTRO = /^join .*(?:latest|what[’']s new)/i
const PLUGS = [/live ?stream/i, /podcast platform/i, /^show notes/i]

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

// Transistor summaries are empty, so build one from the description.
// Most descriptions open with the same "Join Dan Vega and DaShaun Carter..." line
// and close with a live stream plug and a show notes link list.
export function episodeSummary(description: string | null | undefined): string {
  if (!description) return ''
  const beforeNotes = description.split(/show notes/i)[0] ?? ''
  const text = decodeEntities(beforeNotes.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
  // Split only where a space follows the stop, so "Spring Boot 3.2" stays whole.
  const sentences = text.split(/(?<=[.!?]["'”’)]*)\s+/).filter(Boolean)
  const content = sentences.filter((s) => !PLUGS.some((pattern) => pattern.test(s)))
  const withoutIntro = content.filter((s) => !SHOW_INTRO.test(s))
  return (withoutIntro.length ? withoutIntro : content)
    .join(' ')
    .replace(/^in this episode,?\s*/i, '')
    .replace(/^./, (c) => c.toUpperCase())
}

// "S5E27 - Title", "S5E18: Title" and "Spring Office Hours: Episode 37 - Title" all become "Title".
export function shortTitle(title: string): string {
  return title
    .replace(/^spring office hours\s*[-:–]\s*/i, '')
    .replace(/^(?:episode\s*\d+|s\d+\s*e\d+)\s*[-:–]\s*/i, '')
    .trim()
}

export function toEpisodeListItem(ep: TransistorEpisode) {
  return {
    id: ep.id,
    slug: ep.attributes.slug,
    title: ep.attributes.title,
    shortTitle: shortTitle(ep.attributes.title),
    number: ep.attributes.number,
    season: ep.attributes.season,
    summary: episodeSummary(ep.attributes.description),
    publishedAt: ep.attributes.published_at,
    formattedDate: ep.attributes.formatted_published_at,
    duration: ep.attributes.duration,
    durationFormatted: formatDuration(ep.attributes.duration),
    mediaUrl: ep.attributes.media_url,
    youtubeUrl: ep.attributes.video_url ?? null,
  }
}

export async function getTransistorApiKey(event: H3Event): Promise<string> {
  const config = useRuntimeConfig(event)
  const apiKey = config.transistorApiKey
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'Transistor API key not configured',
    })
  }
  return apiKey
}

export async function getTransistorShowId(event: H3Event): Promise<string> {
  const config = useRuntimeConfig(event)
  const showId = config.transistorShowId
  if (!showId) {
    throw createError({
      statusCode: 500,
      message: 'Transistor Show ID not configured',
    })
  }
  return showId
}

async function fetchEpisodePage(
  apiKey: string,
  showId: string,
  page: number
): Promise<TransistorResponse> {
  return await $fetch<TransistorResponse>(`${TRANSISTOR_API_BASE}/episodes`, {
    headers: {
      'x-api-key': apiKey,
    },
    query: {
      show_id: showId,
      'pagination[page]': page,
      'pagination[per]': 100,
      status: 'published',
    },
  })
}

// Transistor returns at most 100 episodes per page, so walk every page.
export const fetchAllEpisodes = defineCachedFunction(
  async (event: H3Event): Promise<TransistorEpisode[]> => {
    const apiKey = await getTransistorApiKey(event)
    const showId = await getTransistorShowId(event)

    const first = await fetchEpisodePage(apiKey, showId, 1)
    const rest = await Promise.all(
      Array.from({ length: first.meta.totalPages - 1 }, (_, i) =>
        fetchEpisodePage(apiKey, showId, i + 2)
      )
    )
    return [first, ...rest].flatMap((response) => response.data)
  },
  { name: 'transistor-episodes', getKey: () => 'all', maxAge: 300 }
)

export async function fetchEpisodeBySlug(
  event: H3Event,
  slug: string
): Promise<TransistorEpisode | null> {
  const episodes = await fetchAllEpisodes(event)
  const episode = episodes.find((ep) => ep.attributes.slug === slug)
  if (!episode) return null

  // The list endpoint leaves out some fields, such as video_url.
  return await fetchEpisodeById(event, episode.id)
}

export async function fetchEpisodeById(
  event: H3Event,
  id: string
): Promise<TransistorEpisode | null> {
  const apiKey = await getTransistorApiKey(event)

  try {
    const response = await $fetch<{ data: TransistorEpisode }>(
      `${TRANSISTOR_API_BASE}/episodes/${id}`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    )
    return response.data
  } catch {
    return null
  }
}

export async function fetchShow(event: H3Event): Promise<TransistorShowResponse['data'] | null> {
  const apiKey = await getTransistorApiKey(event)
  const showId = await getTransistorShowId(event)

  try {
    const response = await $fetch<TransistorShowResponse>(
      `${TRANSISTOR_API_BASE}/shows/${showId}`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    )
    return response.data
  } catch {
    return null
  }
}
