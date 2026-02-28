export default defineEventHandler((event) => {
    const config = useRuntimeConfig()

    return {
        timestamp: new Date().toISOString(),
        status: 'debug_info_active',
        config_values_present: {
            larkBaseAppToken: !!config.larkBaseAppToken,
            larkAppId: !!config.larkAppId,
            larkTable_industrySites: !!config.public?.larkTableIds?.industrySites,
            deepseekApiKey: !!config.deepseekApiKey
        },
        process_env_present: {
            LARK_BASE_APP_TOKEN: !!process.env.LARK_BASE_APP_TOKEN,
            NUXT_PUBLIC_FEISHU_APP_ID: !!process.env.NUXT_PUBLIC_FEISHU_APP_ID,
            LARK_TABLE_INDUSTRY_SITES: !!process.env.LARK_TABLE_INDUSTRY_SITES
        },
        cloudflare_context: {
            has_cloudflare_object: !!event.context.cloudflare,
            has_cloudflare_env: !!event.context.cloudflare?.env,
            keys_in_cloudflare_env: event.context.cloudflare?.env ? Object.keys(event.context.cloudflare.env) : []
        }
    }
})
