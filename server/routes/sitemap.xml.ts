import { fetchEpisodes } from '~/server/utils/transistor'

interface SitemapUrl {
  url: string
  priority: number
  changefreq: string
  lastmod?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl

  // Static pages
  const staticPages: SitemapUrl[] = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/episodes', priority: 0.9, changefreq: 'daily' },
    { url: '/schedule', priority: 0.7, changefreq: 'weekly' },
    { url: '/requests', priority: 0.6, changefreq: 'monthly' },
    { url: '/subscribe', priority: 0.6, changefreq: 'monthly' },
    { url: '/about', priority: 0.5, changefreq: 'monthly' },
  ]

  // Fetch all episodes for dynamic URLs
  let episodeUrls: SitemapUrl[] = []

  try {
    const response = await fetchEpisodes(event, { page: 1, perPage: 100 })
    episodeUrls = response.data.map((ep) => ({
      url: `/episodes/${ep.attributes.slug}`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: ep.attributes.published_at,
    }))
  } catch (error) {
    console.error('Failed to fetch episodes for sitemap:', error)
  }

  const allUrls = [...staticPages, ...episodeUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `\n    <lastmod>${page.lastmod.split('T')[0]}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
