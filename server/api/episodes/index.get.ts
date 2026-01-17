import { fetchEpisodes, formatDuration } from '~/server/utils/transistor'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 10

  const response = await fetchEpisodes(event, { page, perPage })

  return {
    episodes: response.data.map((ep) => ({
      id: ep.id,
      slug: ep.attributes.slug,
      title: ep.attributes.title,
      number: ep.attributes.number,
      season: ep.attributes.season,
      summary: ep.attributes.summary,
      description: ep.attributes.description,
      publishedAt: ep.attributes.published_at,
      formattedDate: ep.attributes.formatted_published_at,
      duration: ep.attributes.duration,
      durationFormatted: formatDuration(ep.attributes.duration),
      imageUrl: ep.attributes.image_url,
      shareUrl: ep.attributes.share_url,
      mediaUrl: ep.attributes.media_url,
      embedHtml: ep.attributes.embed_html,
    })),
    meta: response.meta,
  }
})
