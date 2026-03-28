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

let prismaInstance: PrismaClient

const databaseUrl = process.env.DATABASE_URL || ''

if (databaseUrl) {
  const config = parseDatabaseUrl(databaseUrl)
  const adapter = new PrismaMariaDb(config)
  prismaInstance = new PrismaClient({ adapter } as any)
} else {
  prismaInstance = new PrismaClient()
}

export const prisma = global.prisma || prismaInstance

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
