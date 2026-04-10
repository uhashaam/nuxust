// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // True Static Site Generation (Pre-rendered HTML)
  ssr: true,

  compatibilityDate: '2024-11-18',

  nitro: {
    preset: process.env.NITRO_PRESET || (process.env.CF_PAGES ? 'cloudflare-pages' : 'node-server'),
    compressPublicAssets: { gzip: true, brotli: true },
    experimental: {
      wasm: true
    },
    // Exclude Node-only libraries from Cloudflare build to avoid 1101 errors
    externals: {
      inline: process.env.CF_PAGES ? [] : ['mariadb', '@prisma/adapter-mariadb', 'iconv-lite', 'safer-buffer'],
      external: process.env.CF_PAGES ? ['nodemailer', 'mariadb'] : []
    },
    rollupConfig: {
      plugins: [
        {
          name: 'patch-hasownproperty',
          // Patch the final bundle to fix vm.hasOwnProperty and similar issues
          // that arise from Rollup's CJS-to-ESM interop on module namespace objects
          renderChunk(code) {
            if (code.includes('.hasOwnProperty(')) {
              const patched = code.replace(
                /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\.hasOwnProperty\(/g,
                'Object.prototype.hasOwnProperty.call($1, '
              )
              return { code: patched, map: null }
            }
            return null
          }
        }
      ]
    }
  },

  // Module 2: Site Stability Assurance (Cloudflare CDN Caching Rules)
  routeRules: {
    // Cache standard pages and API responses on the edge for 1 hour, stale-while-revalidate for 12 hours
    '/': { swr: 3600 },
    '/i/**': { swr: 3600 },
    '/products/**': { swr: 3600 },
    '/news/**': { swr: 3600 },
    '/api/industry-sites/**': { swr: 3600 },
    '/api/news/by-site/**': { swr: 1800 },
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
    display: 'swap',
    download: true,
    preconnect: true,
    prefetch: true
  },

  image: {
    provider: 'ipx',
    quality: 80,
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

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    headNext: true,
    inlineRouteRules: true,
    sharedPrerenderData: true,
    componentIslands: true
  },

  vite: {
    build: {
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  },


  // Environment variables (distinguish different sub-sites, dynamically injected during batch deployment)
  runtimeConfig: {
    // Server-only secrets
    // These auto-map from NUXT_{KEY_SCREAMING_SNAKE_CASE} env vars
    databaseUrl: process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL || '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    cloudflareProjectName: 'b-2b',
    
    // SMTP Configuration
    smtpHost: process.env.NUXT_SMTP_HOST || '',
    smtpPort: process.env.NUXT_SMTP_PORT || '465',
    smtpUser: process.env.NUXT_SMTP_USER || '',
    smtpPass: process.env.NUXT_SMTP_PASS || '',
    smtpFrom: process.env.NUXT_SMTP_FROM || '',
    smtpAdminEmail: process.env.NUXT_SMTP_ADMIN_EMAIL || 'contact@b-2b.com',
    jwtSecret: process.env.NUXT_JWT_SECRET || '',
    deepseekApiKey: process.env.NUXT_DEEPSEEK_API_KEY || '',

    public: {
      // Station code is used on frontend
      stationCode: 'tech',
    }
  }
})
// Routing structure updated - forcing rebuild - trigger reload
