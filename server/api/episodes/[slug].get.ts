import {
  episodeSummary,
  fetchAllEpisodes,
  fetchEpisodeBySlug,
  formatDuration,
  shortTitle,
  toEpisodeListItem,
} from '~/server/utils/transistor'

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
    const allEpisodes = await fetchAllEpisodes(event)
    relatedEpisodes = allEpisodes
      .filter(
        (ep) =>
          ep.id !== episode.id &&
          ep.attributes.season === episode.attributes.season
      )
      .slice(0, 3)
      .map(toEpisodeListItem)
  } catch {
    // Silently fail - related episodes are optional
  }

  return {
    id: episode.id,
    slug: episode.attributes.slug,
    title: episode.attributes.title,
    shortTitle: shortTitle(episode.attributes.title),
    number: episode.attributes.number,
    season: episode.attributes.season,
    summary: episodeSummary(episode.attributes.description),
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
