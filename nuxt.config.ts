// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // True Static Site Generation (Pre-rendered HTML)
  ssr: true,

  compatibilityDate: '2024-11-18',

  nitro: {
    preset: 'cloudflare-pages',
    compressPublicAssets: true,
    experimental: {
      nodeCompat: true
    }
  },

  // Module 2: Site Stability Assurance (Cloudflare CDN Caching Rules)
  routeRules: {
    // Cache standard pages and API responses on the edge for 1 hour, stale-while-revalidate for 12 hours
    '/': { swr: 3600 },
    '/i/**': { swr: 3600 },
    '/products/**': { swr: 3600 },
    '/news/**': { swr: 3600 },
    // Cache static assets aggressively
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
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

  modules: [
    '@nuxtjs/seo',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],

  components: [
    { path: '~/components/templates/headers', pathPrefix: false, global: true },
    { path: '~/components/templates/footers', pathPrefix: false, global: true },
    { path: '~/components/templates/banners', pathPrefix: false, global: true },
    { path: '~/components/templates/news-list', pathPrefix: false, global: true },
    { path: '~/components/templates/news-detail', pathPrefix: false, global: true },
    '~/components'
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
    // Dynamic URL based on host to avoid forced canonical redirects on subdomains
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://b-2b.com',
    name: 'B2B New Station',
    description: 'Focus on news coverage of the XX industry, providing the latest industry trends, policy interpretations, and market analysis',
    defaultLocale: 'en',
    // Disable host enforcement to allow subdomains
    trailingSlash: false,
  },

  sitemap: {
    strictNuxtContentPaths: true
  },


  // Environment variables (distinguish different sub-sites, dynamically injected during batch deployment)
  runtimeConfig: {
    // Server-only secrets
    // These auto-map from NUXT_{KEY_SCREAMING_SNAKE_CASE} env vars
    larkAppId: '',
    larkAppSecret: '',
    larkBaseAppToken: '',
    jwtSecret: '',
    cronSecret: '',
    resendApiKey: '',
    cloudflareApiToken: '',
    cloudflareAccountId: '',
    cloudflareZoneId: '',
    deepseekApiKey: '',
    volcAccessKey: '',
    volcSecretKey: '',
    arkApiKey: '',
    volcEndpointId: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    cloudflareProjectName: 'b-2b',

    // Lark/Feishu Config (Server-only)
    // These auto-map from NUXT_LARK_TABLE_{NAME} and NUXT_FEISHU_APP_ID
    feishuAppId: '',
    larkTableIndustrySites: '',
    larkTableUsers: '',
    larkTablePlansCoupons: '',
    larkTableNewsContent: '',
    larkTableAdminSettings: '',
    larkTableProducts: '',

    public: {
      // Station code is used on frontend
      stationCode: 'tech',
    }
  }
})
// Routing structure updated - forcing rebuild - trigger reload
