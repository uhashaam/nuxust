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
  
  // Extra deep check (some Cloudflare versions)
  if (!d1Binding && env?.env?.DB) {
    d1Binding = env.env.DB
  }

  const isCloudflare = !!d1Binding || 
                       (globalThis as any).process?.env?.CF_PAGES === 'true' ||
                       (typeof (globalThis as any).caches !== 'undefined') ||
                       !!(globalThis as any).__cf_env

  if (isCloudflare) {
     const bindingType = typeof d1Binding
     const hasPrepare = d1Binding && typeof d1Binding.prepare === 'function'
     console.log(`[Prisma] Edge Check: hasD1=${!!d1Binding}, type=${bindingType}, hasPrepare=${hasPrepare}`)
  }

  console.log(`[Prisma] Init Check: isCloudflare=${isCloudflare}, hasD1=${!!d1Binding}`)

  // Return cached client if it exists
  if (globalThis.__prisma) {
    return globalThis.__prisma
  }

  // 2. Cloudflare Strategy (STRICT)
  if (isCloudflare) {
      // If we are on Cloudflare, we MUST have a valid D1 binding for subdomains
      try {
        console.log('[Prisma] Initializing Cloudflare D1 (Native D1 Client)...')
        
        // Strict Validation
        if (!d1Binding || typeof (d1Binding as any).prepare !== 'function') {
           throw new Error(`D1 binding is missing or invalid (prepare method not found). Mode: ${isCloudflare ? 'Edge' : 'Non-Edge'}`)
        }

        const [d1AdapterMod, d1ClientMod] = await Promise.all([
            import('@prisma/adapter-d1'),
            import('@prisma/client-d1' as any) // Cast as any to avoid TS errors when aliased
        ])
        
        const PrismaD1 = d1AdapterMod.PrismaD1 || (d1AdapterMod as any).default?.PrismaD1
        const PrismaClientD1Class = d1ClientMod.PrismaClient || (d1ClientMod as any).default?.PrismaClient
        
        if (!PrismaD1) throw new Error('Could not find PrismaD1 class in adapter-d1 module')
        if (!PrismaClientD1Class) throw new Error('Could not find PrismaClient class in @prisma/client-d1')

        // ISOLATION: Temporarily silence MySQL env vars during Edge initialization
        const originalUrl = (process.env as any).DATABASE_URL
        const originalNuxtUrl = (process.env as any).NUXT_DATABASE_URL
        
        try {
          if (originalUrl) (process.env as any).DATABASE_URL = ''
          if (originalNuxtUrl) (process.env as any).NUXT_DATABASE_URL = ''
          
          console.log(`[Prisma] Isolated Edge Init. Env Keys Count: ${Object.keys(process.env).length}`)
          
          const adapter = new PrismaD1(d1Binding)
          const client = new PrismaClientD1Class({ 
            adapter,
            log: ['error', 'warn']
          })
          
          globalThis.__prisma = client
          return client
        } finally {
          // RESTORE: Put vars back for other parts of the app
          if (originalUrl) (process.env as any).DATABASE_URL = originalUrl
          if (originalNuxtUrl) (process.env as any).NUXT_DATABASE_URL = originalNuxtUrl
        }
      } catch (err: any) {
        console.error('[Prisma Cloudflare D1] FAILED:', err.message)
        // Only if it's NOT Cloudflare do we allow falling through to MySQL
        if (isCloudflare) throw err
      }
  }

  // 3. MySQL / MariaDB Strategy (Hostinger / Node.js)
  // Skip this entirely on Cloudflare to minimize bundle size
  if (!isCloudflare) {
      const dbUrl = (config.databaseUrl as string) || 
                   process.env.NUXT_DATABASE_URL || 
                   process.env.DATABASE_URL || 
                   ''

      if (dbUrl && dbUrl.startsWith('mysql')) {
        try {
          console.log('[Prisma] Initializing Direct MySQL (Standard Client)...')
          const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')
          
          const { PrismaClient: PrismaClientStandard } = await import('@prisma/client')
          
          // Standard binary connection (No Adapter)
          const client = new PrismaClientStandard({ 
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
  }

  // 4. Default / Fallback (SQLite)
  console.log('[Prisma) Initializing Local SQLite Fallback...')
  const dbUrlFallback = (config.databaseUrl as string) || process.env.DATABASE_URL || ''
  const cleanDbUrlFallback = dbUrlFallback.trim().replace(/^["'](.+)["']$/, '$1')
  
  const { PrismaClient: PrismaClientFallback } = await import('@prisma/client')
  const client = new PrismaClientFallback({
    datasources: { db: { url: (cleanDbUrlFallback.startsWith('file')) ? cleanDbUrlFallback : 'file:./dev.db' } },
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
