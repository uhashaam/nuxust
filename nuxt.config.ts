// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // True Static Site Generation (Pre-rendered HTML)
  ssr: true,

  compatibilityDate: '2026-01-31',

  nitro: {
    preset: 'cloudflare-pages',
    output: {
      publicDir: 'dist'
    },
    compressPublicAssets: true
  },

  srcDir: '.',

  css: [
    '~/assets/css/editor.css',
    'quill/dist/quill.snow.css'
  ],

  imports: {
    dirs: ['composables']
  },

  // Base path (adapted to sub-sites, can be dynamically modified through environment variables)
  app: {
    baseURL: '/',
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      meta: [
        { name: 'renderer', content: 'webkit' },
        { name: 'force-rendering', content: 'webkit' },
        { name: 'referrer', content: 'no-referrer-when-downgrade' }
      ]
    }
  },

  // SEO plugin configuration (core, SEO optimization)
  modules: [
    '@nuxtjs/seo',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'Outfit': [400, 500, 600, 700]
    },
    display: 'swap'
  },

  image: {
    format: ['webp', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },

  ogImage: {
    enabled: false
  },

  site: {
    url: 'https://b-2b.com',
    name: 'B2B New Station',
    description: 'Focus on news coverage of the XX industry, providing the latest industry trends, policy interpretations, and market analysis',
    defaultLocale: 'en'
  },

  sitemap: {
    strictNuxtContentPaths: true
  },


  // Environment variables (distinguish different sub-sites, dynamically injected during batch deployment)
  runtimeConfig: {
    public: {
      stationCode: 'tech', // Subsite identifier (e.g., tech, finance)
      feishuTableId: 'tblXXXXXXXXXXXXXX', // Feishu multi-dimensional table ID
      feishuAppId: '', // Overridden by NUXT_PUBLIC_FEISHU_APP_ID
      feishuAppSecret: '' // Overridden by NUXT_PUBLIC_FEISHU_APP_SECRET
    }
  }
})
// Routing structure updated - forcing rebuild
