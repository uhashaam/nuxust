export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const mask = (val: string) => val ? `${val.substring(0, 4)}...` : '❌ NOT SET'

    return {
        timestamp: new Date().toISOString(),
        status: 'debug_info_active',
        lark: {
            appId: mask(config.larkAppId),
            appSecret: mask(config.larkAppSecret),
            feishuAppId: mask(config.feishuAppId),
            baseAppToken: mask(config.larkBaseAppToken),
        },
        tables: {
            industrySites: mask(config.larkTableIndustrySites ?? ''),
            users: mask(config.larkTableUsers ?? ''),
            newsContent: mask(config.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.larkTableAdminSettings ?? ''),
            products: mask(config.larkTableProducts ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
