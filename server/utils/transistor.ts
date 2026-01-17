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

export async function fetchEpisodes(
  event: H3Event,
  options: { page?: number; perPage?: number } = {}
): Promise<TransistorResponse> {
  const apiKey = await getTransistorApiKey(event)
  const showId = await getTransistorShowId(event)
  const { page = 1, perPage = 10 } = options

  const response = await $fetch<TransistorResponse>(
    `${TRANSISTOR_API_BASE}/episodes`,
    {
      headers: {
        'x-api-key': apiKey,
      },
      query: {
        show_id: showId,
        'pagination[page]': page,
        'pagination[per]': perPage,
        status: 'published',
      },
    }
  )

  return response
}

export async function fetchEpisodeBySlug(
  event: H3Event,
  slug: string
): Promise<TransistorEpisode | null> {
  const apiKey = await getTransistorApiKey(event)
  const showId = await getTransistorShowId(event)

  // Fetch all episodes to find by slug (Transistor doesn't have slug endpoint)
  const response = await $fetch<TransistorResponse>(
    `${TRANSISTOR_API_BASE}/episodes`,
    {
      headers: {
        'x-api-key': apiKey,
      },
      query: {
        show_id: showId,
        'pagination[page]': 1,
        'pagination[per]': 100,
        status: 'published',
      },
    }
  )

  const episode = response.data.find((ep) => ep.attributes.slug === slug)
  if (!episode) return null

  // Fetch full episode details to get all attributes (including youtube_url)
  // The list endpoint may not return all fields
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
