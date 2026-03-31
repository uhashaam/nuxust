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

        // DYNAMIC IMPORTS: To prevent 500 error during startup in V8 isolates
        console.log('[Prisma] Loading mysql2 driver dynamically...')
        
        const [mysqlModule, adapterModule] = await Promise.all([
          import('mysql2/promise'),
          import('@prisma/adapter-mysql2')
        ]).catch(e => {
          console.error('[Prisma] Failed to load mysql2 modules:', e.message)
          throw new Error(`Driver load failed: ${e.message}`)
        })

        const mysql = (mysqlModule as any).default || mysqlModule
        const { PrismaMysql2 } = adapterModule as any

        const connection = await mysql.createPool({
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          connectionLimit: 5,
          connectTimeout: 10000
        })

        const adapter = new PrismaMysql2(connection)
        prismaInstance = new PrismaClient({ adapter } as any)
        globalThis.__prisma = prismaInstance
        console.log('[Prisma] Edge client initialized with mysql2.')
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
    if (prop === 'then' || prop === 'constructor') return undefined

    // For methods like prisma.$queryRaw, we return an async function
    if (typeof prop === 'string' && prop.startsWith('$')) {
      return async (...args: any[]) => {
        const client = await getActiveClient()
        const fn = (client as any)[prop]
        if (typeof fn === 'function') return fn.apply(client, args)
        throw new Error(`Prisma client method "${prop}" not found.`)
      }
    }

    // For models like prisma.user, we return a sub-proxy for its methods
    return new Proxy({}, {
      get(_, method: string | symbol) {
        return async (...args: any[]) => {
          const client = await getActiveClient()
          const model = (client as any)[prop]
          if (!model) throw new Error(`Prisma model "${String(prop)}" not found.`)
          
          const fn = model[method]
          if (typeof fn === 'function') return fn.apply(model, args)
          throw new Error(`Prisma model method "${String(prop)}.${String(method)}" not found.`)
        }
      }
    })
  }
}) as unknown as PrismaClient
