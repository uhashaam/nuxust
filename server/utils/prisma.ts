import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: any
}

function parseDatabaseUrl(url: string) {
  // Parse mysql://user:password@host:port/database
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  if (!match) throw new Error('Invalid DATABASE_URL format')
  return {
    host: match[3],
    user: decodeURIComponent(match[1]),
    password: decodeURIComponent(match[2]),
    port: parseInt(match[4]),
    database: match[5]
  }
}

let prismaInstance: PrismaClient | null = null

function getClient() {
  if (global.prisma) return global.prisma
  if (prismaInstance) return prismaInstance

  const config = useRuntimeConfig()
  const dbUrl = (config.databaseUrl as string) || process.env.DATABASE_URL || ''

  if (dbUrl) {
    try {
      const dbConfig = parseDatabaseUrl(dbUrl)
      const adapter = new PrismaMariaDb(dbConfig)
      prismaInstance = new PrismaClient({ adapter } as any)
    } catch (e) {
      console.error('Failed to parse database configuration:', e)
      prismaInstance = new PrismaClient()
    }
  } else {
    console.warn('DATABASE_URL is not set. Falling back to default Prisma client.')
    prismaInstance = new PrismaClient()
  }

  if (process.env.NODE_ENV !== 'production') {
    global.prisma = prismaInstance
  }
  return prismaInstance
}

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});
