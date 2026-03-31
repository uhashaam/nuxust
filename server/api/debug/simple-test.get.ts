export default defineEventHandler(async (event) => {
    return {
        status: 'ok',
        message: 'Simple API is working',
        timestamp: new Date().toISOString(),
        env_dump: {
            NODE_ENV: process.env.NODE_ENV,
            NITRO_PRESET: process.env.NITRO_PRESET
        }
    }
})
