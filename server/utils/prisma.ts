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

/**
 * getClient - Dynamic initialization of Prisma client.
 * In production Cloudflare (subdomains), we use the D1 driver adapter.
 * In production Hostinger (main site), we use the MariaDB driver adapter.
 * In development, we use standard SQLite binaries or local DB file.
 */
async function getClient(env?: any): Promise<PrismaClient> {
  const isProduction = process.env.NODE_ENV === 'production'
  const config = useRuntimeConfig()
  
  // 1. Detect Environment
  const d1Binding = env?.DB || (globalThis as any).__cf_env?.DB
  const isCloudflare = !!d1Binding || 
                       (globalThis as any).navigator?.userAgent?.includes('Cloudflare-Workers') ||
                       (typeof (globalThis as any).caches !== 'undefined')

  const dbUrl = (config.databaseUrl as string) || 
               process.env.NUXT_DATABASE_URL || 
               process.env.DATABASE_URL || 
               ''

  // Return cached client if it exists
  if (globalThis.__prisma) {
    return globalThis.__prisma
  }

  // 2. Cloudflare Strategy (Subdomains)
  if (isCloudflare && d1Binding) {
      try {
        console.log('[Prisma] Initializing for Cloudflare D1 (Subdomain Mode)...')
        const { PrismaD1 } = await import('@prisma/adapter-d1')
        const adapter = new PrismaD1(d1Binding)
        const client = new PrismaClient({ 
          adapter,
          log: ['error', 'warn']
        })
        globalThis.__prisma = client
        return client
      } catch (err: any) {
        console.error('[Prisma Cloudflare D1] Adapter initialization failed:', err.message)
      }
  }

  // 3. MariaDB / MySQL Strategy (Hostinger Main Site)
  // We check for DATABASE_URL and ensure it's not a sqlite file url
  if (dbUrl && dbUrl.startsWith('mysql')) {
    try {
      console.log('[Prisma] Initializing for MySQL/MariaDB (Main Site Mode)...')
      
      const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')
      
      // LAZY IMPORTS for MariaDB (Prevents crashes in non-MySQL environments)
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
      console.error('[Prisma MariaDB] Adapter initialization failed:', err.message)
    }
  }

  // 4. Fallback / Node.js Dev (SQLite)
  console.log('[Prisma] Initializing for Standard SQLite (Fallback/Dev Mode)...')
  
  const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')
  const client = new PrismaClient({
    datasources: { db: { url: (cleanDbUrl && cleanDbUrl.startsWith('file')) ? cleanDbUrl : 'file:./dev.db' } },
    log: isProduction ? ['error', 'warn'] : ['query', 'error', 'warn']
  })
  
  globalThis.__prisma = client
  return client
}

// We export a Proxy for 'prisma' to ensure it's always lazy-loaded and doesn't 
// cause top-level 'await unsettled' errors in environments like Cloudflare Workers.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (typeof prop === 'string' && !prop.startsWith('$')) {
       return new Proxy({}, {
         get(_, modelProp) {
           return async (...args: any[]) => {
             const client = (globalThis as any).__prisma || await getClient()
             return (client as any)[prop][modelProp](...args)
           }
         }
       })
    }
    
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
  if (env?.DB || env?.HYPERDRIVE) {
    (globalThis as any).__prisma = await getClient(env)
  }
}
