export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const mask = (val: string) => val ? `${val.substring(0, 4)}...` : '❌ NOT SET'

    return {
        timestamp: new Date().toISOString(),
        status: 'debug_info_active',
        lark: {
            appId: mask(config.larkAppId),
            appSecret: mask(config.larkAppSecret),
            baseAppToken: mask(config.larkBaseAppToken),
        },
        tables: {
            industrySites: mask(config.public.larkTableIds?.industrySites ?? ''),
            users: mask(config.public.larkTableIds?.users ?? ''),
            newsContent: mask(config.public.larkTableIds?.newsContent ?? ''),
            plansCoupons: mask(config.public.larkTableIds?.plansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableIds?.adminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
