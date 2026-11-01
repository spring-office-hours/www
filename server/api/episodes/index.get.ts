import { fetchAllEpisodes, toEpisodeListItem } from '~/server/utils/transistor'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const all = await fetchAllEpisodes(event)

  const perPage = Number(query.perPage) || all.length
  const page = Number(query.page) || 1
  const start = (page - 1) * perPage

  return {
    episodes: all.slice(start, start + perPage).map(toEpisodeListItem),
    meta: {
      currentPage: page,
      totalPages: Math.ceil(all.length / perPage) || 1,
      totalCount: all.length,
      latestSeason: Math.max(0, ...all.map((ep) => ep.attributes.season)),
    },
  }
})
