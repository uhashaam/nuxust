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
    // Strip quotes if present (some .env files wrap URLs in quotes)
    const cleanUrl = urlStr.trim().replace(/^["'](.+)["']$/, '$1')
    const url = new URL(cleanUrl)
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
  const isProduction = process.env.NODE_ENV === 'production'
  
  // Detection logic for database URL
  let dbUrl = (config.databaseUrl as string) || 
               process.env.NUXT_DATABASE_URL || 
               process.env.DATABASE_URL || 
               (globalThis as any).DATABASE_URL || 
               ''

  if (!dbUrl) {
    const msg = '[Prisma] DATABASE_URL is not set. Check your environment variables.'
    console.error(msg)
    if (!isProduction) {
      prismaInstance = new PrismaClient()
      globalThis.__prisma = prismaInstance
      return prismaInstance
    }
    throw createError({ statusCode: 500, message: msg })
  }

  // Cleanup URL once
  const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')

  if (isProduction) {
    // PRODUCTION: (Cloudflare) - MUST use Driver Adapter
    try {
      const maskedUrl = cleanDbUrl.replace(/:[^:@]+@/, ':***@')
      console.log(`[Prisma] Production Initialization with: ${maskedUrl}`)

      const dbConfig = parseDatabaseUrl(cleanDbUrl)
      const pool = mariadb.createPool({
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          connectionLimit: 10,
          connectTimeout: 10000,
          idleTimeout: 30000,
          noDelay: true
      })

      const adapter = new PrismaMariaDb(pool)
      prismaInstance = new PrismaClient({ 
        adapter,
        log: ['error', 'warn']
      } as any)
      
      console.log('[Prisma] Production client initialized with MariaDB adapter.')
    } catch (e: any) {
      console.error('[Prisma] Critical failure in production init:', e)
      throw createError({ statusCode: 500, message: `Prisma Init Failed: ${e.message}` })
    }
  } else {
    // DEVELOPMENT: Use standard Prisma binaries for better local stability
    try {
      console.log('[Prisma] Local Development Initialization.')
      prismaInstance = new PrismaClient({
        datasources: {
          db: { url: cleanDbUrl }
        },
        log: ['query', 'error', 'warn']
      })
      globalThis.__prisma = prismaInstance
      console.log('[Prisma] Local client initialized.')
    } catch (e: any) {
      console.error('[Prisma] Local init failed:', e)
      prismaInstance = new PrismaClient() // Final fallback
    }
  }

  return prismaInstance
}

// Exported object proxies ALL calls to the lazy-initialized client
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    const client = getClient()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  }
})
