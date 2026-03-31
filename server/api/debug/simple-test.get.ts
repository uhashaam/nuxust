export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    return {
        status: 'ok',
        message: 'Simple API is working',
        timestamp: new Date().toISOString(),
        env_dump: {
            NODE_ENV: process.env.NODE_ENV,
            NITRO_PRESET: process.env.NITRO_PRESET,
            // Check visibility of keys (masked)
            has_database_url: !!process.env.DATABASE_URL,
            has_nuxt_database_url: !!process.env.NUXT_DATABASE_URL,
            has_config_database_url: !!config.databaseUrl,
            // Prefix check
            keys: Object.keys(process.env).filter(k => k.includes('DATABASE'))
        }
    }
})
