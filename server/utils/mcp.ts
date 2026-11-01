import type { H3Event } from 'h3'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { fetchAllEpisodes, toEpisodeListItem, type TransistorEpisode } from '~/server/utils/transistor'
import { fetchSchedule } from '~/server/utils/schedule'

const readOnly = { readOnlyHint: true, openWorldHint: false }

function asText(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
}

function showNotes(description: string | null | undefined) {
  const links: { title: string; url: string }[] = []
  for (const match of (description ?? '').matchAll(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi)) {
    const title = (match[2] ?? '').replace(/<[^>]+>/g, '').trim()
    if (match[1]) links.push({ title: title || match[1], url: match[1] })
  }
  return links
}

export function createShowServer(event: H3Event) {
  const siteUrl = useRuntimeConfig(event).public.siteUrl

  const listing = (ep: TransistorEpisode) => {
    const item = toEpisodeListItem(ep)
    return {
      episode: `S${item.season}E${item.number}`,
      title: item.shortTitle,
      date: item.publishedAt?.slice(0, 10),
      minutes: Math.round(item.duration / 60),
      summary: item.summary,
      url: `${siteUrl}/episodes/${item.slug}`,
      youtube: item.youtubeUrl,
    }
  }

  const server = new McpServer(
    { name: 'spring-office-hours', title: 'Spring Office Hours', version: '1.0.0' },
    {
      instructions:
        'Spring Office Hours is a live show and podcast about Spring and Java with Dan Vega and DaShaun Carter. ' +
        'Use search_episodes to find episodes on a topic, get_episode for show notes and links, ' +
        'and upcoming_shows to see what is coming up next. Listeners can ask the hosts a question at ' +
        `${siteUrl}/ask.`,
    }
  )

  server.registerTool(
    'search_episodes',
    {
      title: 'Search episodes',
      description:
        'Find Spring Office Hours episodes by topic, guest or keyword, newest first. ' +
        'Leave the query empty to list the latest episodes.',
      inputSchema: {
        query: z.string().optional().describe('Words to look for, such as "Spring Security" or "Josh Long".'),
        season: z.number().int().positive().optional().describe('Only episodes from this season.'),
        limit: z.number().int().min(1).max(50).default(10).describe('How many episodes to return.'),
      },
      annotations: readOnly,
    },
    async ({ query, season, limit }) => {
      const words = (query ?? '').toLowerCase().split(/\s+/).filter(Boolean)
      const matches = (await fetchAllEpisodes(event))
        .filter((ep) => !season || ep.attributes.season === season)
        .map(listing)
        .filter((ep) => {
          const text = `${ep.title} ${ep.summary}`.toLowerCase()
          return words.every((word) => text.includes(word))
        })
        .sort((a, b) => {
          const inTitle = (ep: { title: string }) => words.every((word) => ep.title.toLowerCase().includes(word))
          return Number(inTitle(b)) - Number(inTitle(a))
        })
      return asText({ total: matches.length, episodes: matches.slice(0, limit) })
    }
  )

  server.registerTool(
    'get_episode',
    {
      title: 'Get an episode',
      description:
        'Get one episode with its summary, audio, YouTube link and the show notes links. ' +
        'Pass the episode code from search_episodes, such as "S5E27".',
      inputSchema: {
        episode: z.string().describe('The episode code, such as "S5E27".'),
      },
      annotations: readOnly,
    },
    async ({ episode }) => {
      const code = episode.trim().toUpperCase().match(/^S0*(\d+)\s*E0*(\d+)$/)
      const found = code
        ? (await fetchAllEpisodes(event)).find(
            (ep) => ep.attributes.season === Number(code[1]) && ep.attributes.number === Number(code[2])
          )
        : undefined
      if (!found) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: `No episode "${episode}". Use search_episodes to find the code.` }],
        }
      }
      return asText({
        ...listing(found),
        audio: found.attributes.media_url,
        showNotes: showNotes(found.attributes.description),
      })
    }
  )

  server.registerTool(
    'upcoming_shows',
    {
      title: 'Upcoming shows',
      description: 'The live shows on the schedule, soonest first. Times are Eastern.',
      annotations: readOnly,
    },
    async () => {
      const shows = (await fetchSchedule()).map((show) => ({
        episode: show.episodeCode || undefined,
        title: show.title,
        date: show.date,
        guests: show.guests || undefined,
        abstract: show.abstract || undefined,
        youtube: show.youtube || undefined,
      }))
      return asText({ shows, askAQuestion: `${siteUrl}/ask` })
    }
  )

  return server
}
