// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // True Static Site Generation (Pre-rendered HTML)
  ssr: true,

  compatibilityDate: '2026-01-31',

  nitro: {
    preset: 'cloudflare-pages',
    compressPublicAssets: true
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
    // Server-only secrets (never exposed to client)
    larkAppId: process.env.NUXT_PUBLIC_FEISHU_APP_ID,
    larkAppSecret: process.env.NUXT_PUBLIC_FEISHU_APP_SECRET,
    larkBaseAppToken: process.env.LARK_BASE_APP_TOKEN,
    jwtSecret: process.env.JWT_SECRET,
    cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
    cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID,
    deepseekApiKey: process.env.DEEPSEEK_API_KEY,
    volcAccessKey: process.env.VOLC_ACCESS_KEY,
    volcSecretKey: process.env.VOLC_SECRET_KEY,
    arkApiKey: process.env.ARK_API_KEY,
    volcEndpointId: process.env.VOLC_ENDPOINT_ID, // Adding placeholder for endpoint ID
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    cloudflareProjectName: process.env.CLOUDFLARE_PROJECT_NAME || 'b-2b',

    public: {
      stationCode: 'tech', // Subsite identifier (e.g., tech, finance)
      feishuAppId: process.env.NUXT_PUBLIC_FEISHU_APP_ID,
      larkTableIds: {
        industrySites: process.env.LARK_TABLE_INDUSTRY_SITES,
        users: process.env.LARK_TABLE_USERS,
        plansCoupons: process.env.LARK_TABLE_PLANS_COUPONS,
        newsContent: process.env.LARK_TABLE_NEWS_CONTENT,
        adminSettings: process.env.LARK_TABLE_ADMIN_SETTINGS,
      }
    }
  }
})
// Routing structure updated - forcing rebuild - trigger reload
