export default defineNitroPlugin((nitroApp) => {
    const config = useRuntimeConfig()

    if (process.env.LARK_BASE_APP_TOKEN) {
        config.larkBaseAppToken = process.env.LARK_BASE_APP_TOKEN
    }
    if (process.env.NUXT_PUBLIC_FEISHU_APP_ID) {
        config.public.feishuAppId = process.env.NUXT_PUBLIC_FEISHU_APP_ID
    }
    if (process.env.NUXT_PUBLIC_FEISHU_APP_SECRET) {
        config.public.feishuAppSecret = process.env.NUXT_PUBLIC_FEISHU_APP_SECRET
    }
    if (process.env.LARK_TABLE_INDUSTRY_SITES) {
        config.public.larkTableIndustrySites = process.env.LARK_TABLE_INDUSTRY_SITES
    }
    if (process.env.LARK_TABLE_USERS) {
        config.public.larkTableUsers = process.env.LARK_TABLE_USERS
    }
    if (process.env.LARK_TABLE_PLANS_COUPONS) {
        config.public.larkTablePlansCoupons = process.env.LARK_TABLE_PLANS_COUPONS
    }
    if (process.env.LARK_TABLE_NEWS_CONTENT) {
        config.public.larkTableNewsContent = process.env.LARK_TABLE_NEWS_CONTENT
    }
    if (process.env.LARK_TABLE_ADMIN_SETTINGS) {
        config.public.larkTableAdminSettings = process.env.LARK_TABLE_ADMIN_SETTINGS
    }
    if (process.env.CLOUDFLARE_ACCOUNT_ID) {
        config.cloudflareAccountId = process.env.CLOUDFLARE_ACCOUNT_ID
    }
    if (process.env.CLOUDFLARE_API_TOKEN) {
        config.cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN
    }
    if (process.env.CLOUDFLARE_ZONE_ID) {
        config.cloudflareZoneId = process.env.CLOUDFLARE_ZONE_ID
    }
    if (process.env.DEEPSEEK_API_KEY) {
        config.deepseekApiKey = process.env.DEEPSEEK_API_KEY
    }
    if (process.env.ARK_API_KEY) {
        config.arkApiKey = process.env.ARK_API_KEY
    }
    if (process.env.VOLC_ENDPOINT_ID) {
        config.volcEndpointId = process.env.VOLC_ENDPOINT_ID
    }
})
