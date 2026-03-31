import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
declare global {
  var __prisma: any
}

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

let prismaInstance: PrismaClient | null = null
let initializationPromise: Promise<PrismaClient> | null = null

/**
 * Modern async-safe initialization for Cloudflare Edge
 */
async function getActiveClient(): Promise<PrismaClient> {
  if (globalThis.__prisma) return globalThis.__prisma
  if (prismaInstance) return prismaInstance
  
  if (initializationPromise) return initializationPromise

  initializationPromise = (async () => {
    const config = useRuntimeConfig()
    const isProduction = process.env.NODE_ENV === 'production'
    
    const dbUrl = (config.databaseUrl as string) || 
                 process.env.NUXT_DATABASE_URL || 
                 process.env.DATABASE_URL || 
                 ''

    if (!dbUrl) {
       if (!isProduction) {
         prismaInstance = new PrismaClient()
         globalThis.__prisma = prismaInstance
         return prismaInstance
       }
       throw new Error('DATABASE_URL is missing.')
    }

    const cleanDbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')

    if (isProduction) {
      try {
        console.log('[Prisma] Dynamic edge initialization starting...')
        const dbConfig = parseDatabaseUrl(cleanDbUrl)

        // Dynamic imports to prevent top-level crashes in V8
        const [mariadbModule, adapterModule] = await Promise.all([
          import('mariadb'),
          import('@prisma/adapter-mariadb')
        ])

        const mariadb = (mariadbModule as any).default || mariadbModule
        const { PrismaMariaDb } = adapterModule as any

        const pool = mariadb.createPool({
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          connectionLimit: 5,
          connectTimeout: 10000
        })

        const adapter = new PrismaMariaDb(pool)
        prismaInstance = new PrismaClient({ adapter } as any)
        globalThis.__prisma = prismaInstance
        console.log('[Prisma] Edge client initialized.')
        return prismaInstance
      } catch (e: any) {
        console.error('[Prisma] Edge init failed:', e.message)
        throw e
      }
    } else {
      prismaInstance = new PrismaClient({
        datasources: { db: { url: cleanDbUrl } }
      })
      globalThis.__prisma = prismaInstance
      return prismaInstance
    }
  })()

  return initializationPromise
}

/**
 * Exported prisma proxy.
 * All method calls (e.g., prisma.user.findMany()) will internally await initialization.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop: string | symbol) {
    // Standard Prisma attributes that aren't models/methods
    if (prop === 'then' || prop === 'constructor') return undefined

    return new Proxy({}, {
      get(_, method: string | symbol) {
        return async (...args: any[]) => {
          const client = await getActiveClient()
          const model = (client as any)[prop]
          if (!model) throw new Error(`Prisma model "${String(prop)}" not found.`)
          
          const fn = model[method]
          if (typeof fn === 'function') {
            return fn.apply(model, args)
          }
          return fn
        }
      },
      // Support direct method calls on client like prisma.$queryRaw
      apply(_, __, args) {
        return (async () => {
          const client = await getActiveClient()
          const fn = (client as any)[prop]
          if (typeof fn === 'function') {
            return fn.apply(client, args)
          }
          throw new Error(`Prisma method "${String(prop)}" not found.`)
        })()
      }
    })
  }
}) as unknown as PrismaClient
