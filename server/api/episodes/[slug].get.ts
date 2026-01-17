import { fetchEpisodeBySlug, fetchEpisodes, formatDuration } from '~/server/utils/transistor'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Episode slug is required',
    })
  }

  const episode = await fetchEpisodeBySlug(event, slug)

  if (!episode) {
    throw createError({
      statusCode: 404,
      message: 'Episode not found',
    })
  }

  // Fetch related episodes from the same season (excluding current episode)
  let relatedEpisodes: any[] = []
  try {
    const allEpisodes = await fetchEpisodes(event, { page: 1, perPage: 100 })
    relatedEpisodes = allEpisodes.data
      .filter(
        (ep) =>
          ep.id !== episode.id &&
          ep.attributes.season === episode.attributes.season
      )
      .slice(0, 3)
      .map((ep) => ({
        id: ep.id,
        slug: ep.attributes.slug,
        title: ep.attributes.title,
        number: ep.attributes.number,
        season: ep.attributes.season,
        summary: ep.attributes.summary,
        formattedDate: ep.attributes.formatted_published_at,
        durationFormatted: formatDuration(ep.attributes.duration),
        imageUrl: ep.attributes.image_url,
      }))
  } catch {
    // Silently fail - related episodes are optional
  }

  return {
    id: episode.id,
    slug: episode.attributes.slug,
    title: episode.attributes.title,
    number: episode.attributes.number,
    season: episode.attributes.season,
    summary: episode.attributes.summary,
    description: episode.attributes.description,
    publishedAt: episode.attributes.published_at,
    formattedDate: episode.attributes.formatted_published_at,
    duration: episode.attributes.duration,
    durationFormatted: formatDuration(episode.attributes.duration),
    imageUrl: episode.attributes.image_url,
    shareUrl: episode.attributes.share_url,
    mediaUrl: episode.attributes.media_url,
    embedHtml: episode.attributes.embed_html,
    transcriptUrl: episode.attributes.transcript_url ?? null,
    youtubeUrl: episode.attributes.video_url ?? null,
    relatedEpisodes,
  }
})
