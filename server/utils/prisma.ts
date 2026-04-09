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

// Global instance to prevent exhaustion in development
declare global {
  var __prisma: PrismaClient | undefined
}

let cachedDbUrl = ''

/**
 * getClient - Dynamic initialization of Prisma client.
 * In production (Cloudflare), we use the MariaDB driver adapter.
 * In development, we use standard binaries.
 */
async function getClient(env?: any): Promise<PrismaClient> {
  const isProduction = process.env.NODE_ENV === 'production'
  const config = useRuntimeConfig()
  
  const dbUrl = env?.HYPERDRIVE?.connectionString || 
               (config.databaseUrl as string) || 
               process.env.NUXT_DATABASE_URL || 
               process.env.DATABASE_URL || 
               ''

  // Return cached client if it exists and the connection string hasn't changed
  if (globalThis.__prisma && cachedDbUrl === dbUrl) {
    return globalThis.__prisma
  }
  
  cachedDbUrl = dbUrl

  if (!dbUrl) {
    console.warn('[Prisma] DATABASE_URL is not set.')
    const emptyClient = new PrismaClient()
    globalThis.__prisma = emptyClient
    return emptyClient
  }

  const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')

  if (isProduction) {
    try {
      console.log('[Prisma] Initializing with Hyperdrive (Lazy Driver Loading)...')
      
      // LAZY/DYNAMIC IMPORTS: 
      // Moving these inside prevents blocky/heavy startup on Cloudflare Edge.
      const [{ PrismaMariaDb }, { default: mariadb }] = await Promise.all([
        import('@prisma/adapter-mariadb'),
        import('mariadb')
      ])
      
      const pool = mariadb.createPool({ 
        connectionString: cleanDbUrl,
        connectionLimit: 10
      })

      const adapter = new PrismaMariaDb(pool)
      const client = new PrismaClient({ 
        adapter,
        log: ['error', 'warn']
      })
      
      globalThis.__prisma = client
      return client
    } catch (err: any) {
      console.error('[Prisma Internal] Adapter initialization failed:', err.message)
      const fallbackClient = new PrismaClient({
        datasources: { db: { url: cleanDbUrl } }
      })
      globalThis.__prisma = fallbackClient
      return fallbackClient
    }
  } else {
    const client = new PrismaClient({
      datasources: { db: { url: cleanDbUrl } },
      log: ['query', 'error', 'warn']
    })
    globalThis.__prisma = client
    return client
  }
}

// We export a Proxy for 'prisma' to ensure it's always lazy-loaded and doesn't 
// cause top-level 'await unsettled' errors in environments like Cloudflare Workers.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    // Return a function that handles the async client resolution for Prisma methods
    if (typeof prop === 'string' && !prop.startsWith('$')) {
       // This returns a proxy for the model (e.g., prisma.user)
       return new Proxy({}, {
         get(_, modelProp) {
           return async (...args: any[]) => {
             const client = (globalThis as any).__prisma || await getClient()
             return (client as any)[prop][modelProp](...args)
           }
         }
       })
    }
    
    // Handle $queryRaw, $connect, etc.
    if (typeof prop === 'string' && prop.startsWith('$')) {
      return async (...args: any[]) => {
        const client = (globalThis as any).__prisma || await getClient()
        return (client as any)[prop](...args)
      }
    }

    return Reflect.get({} as any, prop, receiver)
  }
})

export async function updatePrismaWithEnv(env: any) {
  if (process.env.NODE_ENV === 'production' && env?.HYPERDRIVE) {
    (globalThis as any).__prisma = await getClient(env)
  }
}
