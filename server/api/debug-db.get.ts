import { prisma } from '../utils/prisma'

// Attempt to read at module scope like prisma utils does
const globalConfig = useRuntimeConfig()
const globalProcessEnv = process.env.DATABASE_URL
const globalConfigDb = globalConfig.databaseUrl

export default defineEventHandler(async (event) => {
  const eventConfig = useRuntimeConfig(event)
  const eventDbUrl = eventConfig.databaseUrl as string || process.env.DATABASE_URL || ''
  
  // Note: we might also want to check cloudflare env specifically
  const cfEnv = event.context.cloudflare?.env?.DATABASE_URL
  const nuxtCfEnv = event.context.cloudflare?.env?.NUXT_DATABASE_URL

  let prismaError = null
  let userCount = -1

  try {
    userCount = await prisma.user.count()
  } catch (e: any) {
    prismaError = e.message || e.toString()
  }

  // Force checking what a raw mariadb adapter might see
  let testAdapterError = null
  try {
    // Just testing if we can even require the adapter
    const defaultUrl = 'mysql://u199015239_db_admin:Rickge%40_11123@193.203.166.31:3306/u199015239_nuxt_app'
    const match = defaultUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    if(match) {
        // Just verify mathing works
        const parsed = {
            host: match[3],
            user: decodeURIComponent(match[1]),
            password: decodeURIComponent(match[2]),
            port: parseInt(match[4]),
            database: match[5]
          }
    }
  } catch(err: any) {
    testAdapterError = err.message
  }

  return {
    moduleScope: {
        globalProcessEnvExists: !!globalProcessEnv,
        globalConfigDbExists: !!globalConfigDb,
    },
    eventScope: {
        eventDbUrlExists: !!eventDbUrl,
        cfEnvExists: !!cfEnv,
        nuxtCfEnvExists: !!nuxtCfEnv,
        maskedDbUrl: eventDbUrl ? eventDbUrl.replace(/:[^:@]+@/, ':***@') : null
    },
    prismaStatus: prismaError ? 'error' : 'connected',
    userCount,
    prismaError,
    testAdapterError,
    nodeEnv: process.env.NODE_ENV
  }
})
