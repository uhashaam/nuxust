import { PrismaClient } from '@prisma/client'
import { PrismaMysql2 } from '@prisma/adapter-mysql2'
import mysql from 'mysql2/promise'

/**
 * Robust URL parsing.
 */
function parseDatabaseUrl(urlStr: string) {
  try {
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
    throw new Error('Invalid DATABASE_URL format.')
  }
}

// Global instance to prevent exhaustion in development
declare global {
  var __prisma: PrismaClient | undefined
}

function getClient(): PrismaClient {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction && globalThis.__prisma) {
    return globalThis.__prisma
  }

  const config = useRuntimeConfig()
  const dbUrl = (config.databaseUrl as string) || 
               process.env.NUXT_DATABASE_URL || 
               process.env.DATABASE_URL || 
               ''

  if (!dbUrl) {
    if (isProduction) throw new Error('[Prisma] DATABASE_URL is not set.')
    const devClient = new PrismaClient()
    globalThis.__prisma = devClient
    return devClient
  }

  const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')

  if (isProduction) {
    // Production (Cloudflare Edge) initialization with mysql2 driver adapter
    const dbConfig = parseDatabaseUrl(cleanDbUrl)
    const connection = mysql.createPool({
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

    const adapter = new PrismaMysql2(connection)
    const client = new PrismaClient({ 
      adapter,
      log: ['error', 'warn']
    } as any)
    
    return client
  } else {
    // Development initialization with standard binaries
    const client = new PrismaClient({
      datasources: { db: { url: cleanDbUrl } },
      log: ['query', 'error', 'warn']
    })
    globalThis.__prisma = client
    return client
  }
}

// Export the singleton instance
// For Cloudflare, it will be initialized once when the module is loaded
export const prisma = getClient()
