// POLYFILL: Robust fix for Cloudflare Edge and Vite dev crashes (hasOwnProperty and EventEmitter issues)
(function polyfill() {
  if (typeof globalThis !== 'undefined') {
    // 1. Ensure hasOwnProperty is reliable on globalThis
    if (typeof (globalThis as any).hasOwnProperty !== 'function') {
      try {
        (globalThis as any).hasOwnProperty = function(prop: string) {
          return Object.prototype.hasOwnProperty.call(this, prop)
        }
      } catch (e) {}
    }
  }
})();

import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import mariadb from 'mariadb'

// Global instance to prevent exhaustion in development
declare global {
  var __prisma: PrismaClient | undefined
}

/**
 * Robust URL parsing for standard connections.
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

function getClient(env?: any): PrismaClient {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction && globalThis.__prisma) {
    return globalThis.__prisma
  }

  const config = useRuntimeConfig()
  
  // 1. Priority: Hyperdrive connection string (from Cloudflare binding)
  // 2. Fallback: Standard DATABASE_URL env var
  const dbUrl = env?.HYPERDRIVE?.connectionString || 
               (config.databaseUrl as string) || 
               process.env.NUXT_DATABASE_URL || 
               process.env.DATABASE_URL || 
               ''

  if (!dbUrl) {
    if (isProduction) {
        console.warn('[Prisma] DATABASE_URL is not set, creating empty client.')
        return new PrismaClient()
    }
    const devClient = new PrismaClient()
    globalThis.__prisma = devClient
    return devClient
  }

  const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')

  if (isProduction) {
    // Production (Cloudflare Edge) initialization with Hyperdrive
    try {
      console.log('[Prisma] Initializing with Hyperdrive/Driver Adapter...')
      
      const pool = mariadb.createPool({ 
        connectionString: cleanDbUrl,
        connectionLimit: 10
      })

      const adapter = new PrismaMariaDb(pool)
      const client = new PrismaClient({ 
        adapter,
        log: ['error', 'warn']
      })
      
      return client
    } catch (err: any) {
      console.error('[Prisma Internal] Adapter initialization failed:', err.message)
      // Fallback to standard WASM client
      return new PrismaClient({
        datasources: { db: { url: cleanDbUrl } }
      })
    }
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

// Export the singleton (will be initialized on first import)
// Note: In Cloudflare, we might re-initialize it with the env object if needed
export const prisma = getClient()

// Helper to re-initialize with Cloudflare environment if necessary
export function updatePrismaWithEnv(env: any) {
    if (process.env.NODE_ENV === 'production') {
        (globalThis as any).__prisma = getClient(env)
    }
}
