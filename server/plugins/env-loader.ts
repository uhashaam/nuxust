export default defineNitroPlugin((nitroApp) => {
    const config = useRuntimeConfig()

    // Map Cloudflare bindings (which Nitro exposes on process.env) directly to runtimeConfig
    // because Cloudflare Pages "Secret" variables are not available during the build step.

    if (process.env.LARK_BASE_APP_TOKEN) config.larkBaseAppToken = process.env.LARK_BASE_APP_TOKEN
    if (process.env.NUXT_PUBLIC_FEISHU_APP_ID) config.larkAppId = process.env.NUXT_PUBLIC_FEISHU_APP_ID
    if (process.env.NUXT_PUBLIC_FEISHU_APP_SECRET) config.larkAppSecret = process.env.NUXT_PUBLIC_FEISHU_APP_SECRET
    if (process.env.JWT_SECRET) config.jwtSecret = process.env.JWT_SECRET

    if (process.env.DEEPSEEK_API_KEY) config.deepseekApiKey = process.env.DEEPSEEK_API_KEY
    if (process.env.ARK_API_KEY) config.arkApiKey = process.env.ARK_API_KEY
    if (process.env.VOLC_ACCESS_KEY) config.volcAccessKey = process.env.VOLC_ACCESS_KEY
    if (process.env.VOLC_SECRET_KEY) config.volcSecretKey = process.env.VOLC_SECRET_KEY
    if (process.env.VOLC_ENDPOINT_ID) config.volcEndpointId = process.env.VOLC_ENDPOINT_ID

    // Map public table IDs
    if (!config.public.larkTableIds) config.public.larkTableIds = {} as any
    if (process.env.LARK_TABLE_INDUSTRY_SITES) config.public.larkTableIds.industrySites = process.env.LARK_TABLE_INDUSTRY_SITES
    if (process.env.LARK_TABLE_USERS) config.public.larkTableIds.users = process.env.LARK_TABLE_USERS
    if (process.env.LARK_TABLE_PLANS_COUPONS) config.public.larkTableIds.plansCoupons = process.env.LARK_TABLE_PLANS_COUPONS
    if (process.env.LARK_TABLE_NEWS_CONTENT) config.public.larkTableIds.newsContent = process.env.LARK_TABLE_NEWS_CONTENT
    if (process.env.LARK_TABLE_ADMIN_SETTINGS) config.public.larkTableIds.adminSettings = process.env.LARK_TABLE_ADMIN_SETTINGS
})
