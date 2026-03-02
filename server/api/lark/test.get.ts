/**
 * Test endpoint to verify Lark Base connection
 */
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()

        // Check if credentials are configured
        if (!config.larkAppId || !config.larkAppSecret) {
            return {
                status: 'error',
                message: 'Lark credentials not configured. Please set NUXT_PUBLIC_FEISHU_APP_ID and NUXT_PUBLIC_FEISHU_APP_SECRET in .env file.'
            }
        }

        // Import the auth utility
        const { getTenantAccessToken } = await import('../../utils/lark/auth')

        // Try to get an access token
        const token = await getTenantAccessToken()

        if (token) {
            return {
                status: 'connected',
                message: 'Lark Base connection successful',
                appId: config.larkAppId,
                tables: config.public /* larkTableIds deprecated */ || {}
            }
        }

        return {
            status: 'error',
            message: 'Failed to obtain access token'
        }
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message || 'Unknown error occurred',
            error: error.toString()
        }
    }
})
