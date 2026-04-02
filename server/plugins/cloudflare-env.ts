import { updatePrismaWithEnv } from '../utils/prisma'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    // Access the Cloudflare environment from the request context
    const cloudflareEnv = event.context.cloudflare?.env
    
    if (cloudflareEnv) {
      // Re-initialize Prisma with the binding if it has changed or is new
      updatePrismaWithEnv(cloudflareEnv)
    }
  })
})
