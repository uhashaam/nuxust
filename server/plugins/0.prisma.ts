import { setD1Binding } from '../utils/prisma'

/**
 * Nitro Plugin: Lifecycle hook to capture Cloudflare environment early.
 * This runs on worker startup and on each request in Cloudflare Pages.
 */
export default defineNitroPlugin((nitroApp) => {
  // Capture environment on every request context
  nitroApp.hooks.hook('request', async (event) => {
    // Priority 1: standard event context
    const cf = event.context.cloudflare
    if (cf?.env?.DB) {
      setD1Binding(cf.env.DB)
      return
    }
    
    // Priority 2: nested context (some Nitro versions)
    const cfEnv = (event.context as any).env?.DB
    if (cfEnv) {
      setD1Binding(cfEnv)
    }
  })

  // Startup capture for global bindings (persistent workers)
  const globalD1 = (globalThis as any).DB || (globalThis as any).__cf_env?.DB || (globalThis as any).env?.DB
  if (globalD1) {
    setD1Binding(globalD1)
  }
})
