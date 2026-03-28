import { PrismaClient } from '@prisma/client'
import { PrismaMysql } from '@prisma/adapter-mysql'
import mysql from 'mysql2/promise'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: any
}

let prismaClient: PrismaClient

// In Cloudflare Workers/Pages runtime, we must use the driver adapter
// In local development or Node.js runtime, we can use the standard client or the adapter
// We check for the database URL environment variable to determine if we can connect
const databaseUrl = process.env.DATABASE_URL

if (process.env.NITRO_PRESET === 'cloudflare-pages' || process.env.NODE_ENV === 'production' || !databaseUrl?.includes('localhost')) {
  // Use Driver Adapter logic
  const connectionString = databaseUrl || ''
  const pool = mysql.createPool(connectionString)
  const adapter = new PrismaMysql(pool)
  prismaClient = new PrismaClient({ adapter })
} else {
  // Standard Client for local dev
  prismaClient = new PrismaClient()
}

export const prisma = global.prisma || prismaClient

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
