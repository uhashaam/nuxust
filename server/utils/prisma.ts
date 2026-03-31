import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import mariadb from 'mariadb'

// Prevent multiple instances of Prisma Client in development
declare global {
  var __prisma: any
}

/**
 * Robust URL parsing that handles special characters, missing ports, and query parameters.
 */
function parseDatabaseUrl(urlStr: string) {
  try {
    const url = new URL(urlStr)
    return {
      host: url.hostname,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      port: parseInt(url.port) || 3306,
      database: url.pathname.replace(/^\//, '')
    }
  } catch (e) {
    console.error('[Prisma] Error parsing DATABASE_URL:', e)
    throw new Error('Invalid DATABASE_URL format. Expected: mysql://user:pass@host:port/database')
  }
}

let prismaInstance: PrismaClient | null = null

function getClient() {
  if (globalThis.__prisma) return globalThis.__prisma
  if (prismaInstance) return prismaInstance

  const config = useRuntimeConfig()
  
  // In Nuxt 3, runtimeConfig is the most reliable way to get env vars in production (Cloudflare)
  // NUXT_DATABASE_URL auto-maps to config.databaseUrl
  const dbUrl = (config.databaseUrl as string) || 
                process.env.NUXT_DATABASE_URL || 
                process.env.DATABASE_URL || 
                (globalThis as any).DATABASE_URL || // Cloudflare global binding fallback
                ''

  const isProduction = process.env.NODE_ENV === 'production'

  if (dbUrl) {
    try {
      // Always log (masked) in production to help diagnose connectivity issues
      const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':***@')
      console.log(`[Prisma] Attempting initialization in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`)
      console.log(`[Prisma] URL: ${maskedUrl}`)

      const dbConfig = parseDatabaseUrl(dbUrl)
      
      // In production (Cloudflare), we MUST use the driver adapter. 
      // Standard Prisma engine binaries do not run on Cloudflare Workers/Pages.
      // We also use it in development if we want to ensure consistency.
      
      console.log(`[Prisma] Creating MariaDB pool for host: ${dbConfig.host}:${dbConfig.port}`)
      
      const pool = mariadb.createPool({
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          connectionLimit: isProduction ? 10 : 2, // Keep limits low for serverless
          connectTimeout: 10000, // 10 seconds timeout
          // Essential for Cloudflare/Edge compatibility:
          idleTimeout: 30000,
          noDelay: true
      })

      const adapter = new PrismaMariaDb(pool)
      prismaInstance = new PrismaClient({ 
        adapter,
        log: isProduction ? ['error', 'warn'] : ['query', 'error', 'warn']
      } as any)
      
      console.log('[Prisma] Client initialized with MariaDB pool adapter.')
    } catch (e: any) {
      console.error('[Prisma] Critical failure during client initialization:', e)
      
      if (!isProduction) {
        console.warn('[Prisma] Falling back to standard PrismaClient in development.')
        prismaInstance = new PrismaClient()
      } else {
        // High-importance failure in production
        const error = new Error(`Prisma Initialization Failed: ${e.message}`)
        ;(error as any).cause = e
        throw error
      }
    }
  } else {
    const msg = '[Prisma] DATABASE_URL is not set. Check your NUXT_DATABASE_URL environment variable in Cloudflare.'
    console.error(msg)
    
    if (!isProduction) {
      prismaInstance = new PrismaClient()
    } else {
      throw createError({
        statusCode: 500,
        message: msg
      })
    }
  }

  // Cache instance in development to prevent Exhausted Resource errors
  if (!isProduction) {
    globalThis.__prisma = prismaInstance
  }
  
  return prismaInstance
}

// Exported object proxies all calls to the lazy-initialized client
export const prisma = {
  get user() { return getClient().user; },
  get product() { return getClient().product; },
  get industrySite() { return getClient().industrySite; },
  get newsContent() { return getClient().newsContent; },
  get planCoupon() { return getClient().planCoupon; },
  get adminSetting() { return getClient().adminSetting; },
  get $transaction() { return (getClient() as any).$transaction.bind(getClient()); },
  get $disconnect() { return (getClient() as any).$disconnect.bind(getClient()); },
  get $connect() { return (getClient() as any).$connect.bind(getClient()); },
} as unknown as PrismaClient;
