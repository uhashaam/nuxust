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

let _d1Binding: any = null

/**
 * setD1Binding - Used by middleware/plugins to inject the D1 binding.
 */
export function setD1Binding(binding: any) {
  if (binding && (binding.prepare || binding.exec)) {
    console.log('[Prisma] Valid D1 Binding detected and injected.')
    _d1Binding = binding
    // Reset client to force re-initialization with the new valid binding
    globalThis.__prisma = undefined
  }
}

export async function getClient(env?: any): Promise<PrismaClient> {
  const isProduction = process.env.NODE_ENV === 'production'
  const config = useRuntimeConfig()
  
  // 1. Detect Environment Heuristics
  // Priority: context-passed env -> injected binding -> global bindings
  let d1Binding = env?.DB || _d1Binding || (globalThis as any).__cf_env?.DB || (globalThis as any).DB
  
  // Double-nested env check (sometimes seen in Nitro/Pages)
  if (!d1Binding && env?.env?.DB) {
    d1Binding = env.env.DB
  }

  const isCloudflare = !!d1Binding || 
                       (globalThis as any).process?.env?.CF_PAGES === 'true' ||
                       (typeof (globalThis as any).caches !== 'undefined') ||
                       !!(globalThis as any).__cf_env

  console.log(`[Prisma] Init Check: isCloudflare=${isCloudflare}, hasD1=${!!d1Binding}`)

  // Return cached client if it exists
  if (globalThis.__prisma) {
    return globalThis.__prisma
  }

  // 2. Cloudflare Strategy (STRICT)
  if (isCloudflare) {
      // If we are on Cloudflare, we MUST have a valid D1 binding for subdomains
      try {
        console.log('[Prisma] Initializing Cloudflare D1 Adapter...')
        
        // Strict Validation
        if (!d1Binding || typeof (d1Binding as any).prepare !== 'function') {
           throw new Error(`D1 binding is missing or invalid (prepare method not found). Mode: ${isCloudflare ? 'Edge' : 'Non-Edge'}`)
        }

        const d1Mod = await import('@prisma/adapter-d1')
        const PrismaD1 = d1Mod.PrismaD1 || (d1Mod as any).default?.PrismaD1
        
        if (!PrismaD1) throw new Error('Could not find PrismaD1 class in adapter-d1 module')

        const adapter = new PrismaD1(d1Binding)
        const client = new PrismaClient({ 
          adapter,
          log: ['error', 'warn']
        })
        
        globalThis.__prisma = client
        return client
      } catch (err: any) {
        console.error('[Prisma Cloudflare D1] FAILED:', err.message)
        // Only if it's NOT Cloudflare do we allow falling through to MySQL
        if (isCloudflare) throw err
      }
  }

  const dbUrl = (config.databaseUrl as string) || 
               process.env.NUXT_DATABASE_URL || 
               process.env.DATABASE_URL || 
               ''

  // 3. MySQL / MariaDB Strategy (Hostinger / Node.js)
  // With provider="mysql" in schema.prisma, we can use a direct connection on Node.js
  if (dbUrl && dbUrl.startsWith('mysql')) {
    try {
      console.log('[Prisma] Initializing Direct MySQL Connection for Main Site...')
      const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')
      
      // Standard binary connection (No Adapter)
      const client = new PrismaClient({ 
        datasources: { db: { url: cleanDbUrl } },
        log: ['error', 'warn']
      })
      
      globalThis.__prisma = client
      return client
    } catch (err: any) {
      console.error('[Prisma MySQL Direct] FAILED:', err.message)
      throw err
    }
  }

  // 4. Default / Fallback (SQLite)
  console.log('[Prisma) Initializing Local SQLite Fallback...')
  const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')
  
  const client = new PrismaClient({
    datasources: { db: { url: (cleanDbUrl.startsWith('file')) ? cleanDbUrl : 'file:./dev.db' } },
    log: isProduction ? ['error', 'warn'] : ['query', 'error', 'warn']
  })
  
  globalThis.__prisma = client
  return client
}

// Lazy Proxy Export
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
  if (env?.DB) {
     setD1Binding(env.DB)
  }
}
