import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: any
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
  if (global.prisma) return global.prisma
  if (prismaInstance) return prismaInstance

  const config = useRuntimeConfig()
  
  // Try NUXT_DATABASE_URL (auto-mapped by Nuxt) or direct process.env fallbacks
  const dbUrl = (config.databaseUrl as string) || 
                process.env.NUXT_DATABASE_URL || 
                process.env.DATABASE_URL || 
                ''

  const isProduction = process.env.NODE_ENV === 'production'

  if (dbUrl) {
    try {
      // Always log (masked) in production to help diagnose connectivity issues
      const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':***@')
      console.log(`[Prisma] Initializing with: ${maskedUrl}`)

      const dbConfig = parseDatabaseUrl(dbUrl)
      
      // In production (Cloudflare), we MUST use the driver adapter. 
      // Standard Prisma engine binaries do not run on Cloudflare Workers/Pages.
      const adapter = new PrismaMariaDb(dbConfig)
      prismaInstance = new PrismaClient({ 
        adapter,
        log: !isProduction ? ['query', 'error', 'warn'] : ['error']
      } as any)
      
      console.log('[Prisma] Client initialized with MariaDB adapter.')
    } catch (e) {
      console.error('[Prisma] Critical failure during client initialization:', e)
      
      if (!isProduction) {
        console.warn('[Prisma] Falling back to standard PrismaClient in development.')
        prismaInstance = new PrismaClient()
      } else {
        // High-importance failure in production
        throw e
      }
    }
  } else {
    const msg = '[Prisma] DATABASE_URL is not set. Check your environment variables.'
    console.error(msg)
    
    if (!isProduction) {
      prismaInstance = new PrismaClient()
    } else {
      throw new Error(msg)
    }
  }

  // Cache instance in development to prevent Exhausted Resource errors
  if (!isProduction) {
    global.prisma = prismaInstance
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
