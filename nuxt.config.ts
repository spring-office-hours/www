// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Spring Office Hours',
      titleTemplate: '%s | Spring Office Hours',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Spring Office Hours - A podcast about Spring Framework, Spring Boot, and the Java ecosystem with Dan Vega and DaShaun Carter',
        },
        { name: 'theme-color', content: '#16a34a' },
        { property: 'og:site_name', content: 'Spring Office Hours' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@therealdanvega' },
        { property: 'og:image', content: 'https://springofficehours.io/og-image.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://springofficehours.io' },
      ],
    },
  },

  runtimeConfig: {
    transistorApiKey: process.env.TRANSISTOR_API_KEY,
    transistorShowId: process.env.TRANSISTOR_SHOW_ID,
    notionApiKey: process.env.NOTION_API_KEY,
    notionScheduleDbId: process.env.NOTION_SCHEDULE_DB_ID,
    notionPotluckDbId: process.env.NOTION_POTLUCK_DB_ID,
    public: {
      siteUrl: process.env.SITE_URL || 'https://springofficehours.io',
    },
  },

  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
    },
  },

  routeRules: {
    '/api/**': { cors: true },
  },
})
