export default defineEventHandler(async (event) => {
  const cf = event.context.cloudflare || (globalThis as any).__cf_env
  
  // Safe environment inspection (exclude secrets)
  const envInfo: any = {
    timestamp: new Date().toISOString(),
    node_env: process.env.NODE_ENV,
    runtime: {
      has_process: typeof process !== 'undefined',
      has_global_db: !!(globalThis as any).DB,
      has_global_cf_env: !!(globalThis as any).__cf_env,
      has_event_cf: !!event.context.cloudflare,
      is_pages: process.env.CF_PAGES === '1' || !!(globalThis as any).__cf_env
    },
    cloudflare: {
      has_env: !!cf?.env,
      env_keys: cf?.env ? Object.keys(cf.env) : [],
    }
  }

  // Deep inspection of the DB binding if it exists
  const db = cf?.env?.DB || (globalThis as any).DB || (globalThis as any).__cf_env?.DB
  if (db) {
    envInfo.db_binding = {
      present: true,
      type: typeof db,
      keys: Object.keys(db),
      has_prepare: typeof db.prepare === 'function',
      has_exec: typeof db.exec === 'function',
      constructor_name: db.constructor?.name
    }
  } else {
    envInfo.db_binding = { present: false }
  }

  return envInfo
})
