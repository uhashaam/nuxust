import { setD1Binding } from '../utils/prisma'

/**
 * Nitro Plugin: Lifecycle hook to capture Cloudflare environment early.
 * This runs on worker startup and on each request in Cloudflare Pages.
 */
export default defineNitroPlugin((nitroApp) => {
  // Capture environment on every request context if available
  nitroApp.hooks.hook('request', async (event) => {
    const cf = event.context.cloudflare
    if (cf?.env?.DB) {
      setD1Binding(cf.env.DB)
    }
  })

  // Also check for global bindings if possible during init (for some worker environments)
  const globalD1 = (globalThis as any).DB || (globalThis as any).__cf_env?.DB
  if (globalD1) {
    setD1Binding(globalD1)
  }
})
