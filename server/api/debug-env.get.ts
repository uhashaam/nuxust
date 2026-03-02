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
            industrySites: mask( 'config.public.larkTable' + (export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Groups[1].Value -replace '^(\w)', { export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Value.ToUpper() })  ?? ''),
            users: mask( 'config.public.larkTable' + (export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Groups[1].Value -replace '^(\w)', { export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Value.ToUpper() })  ?? ''),
            newsContent: mask( 'config.public.larkTable' + (export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Groups[1].Value -replace '^(\w)', { export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Value.ToUpper() })  ?? ''),
            plansCoupons: mask( 'config.public.larkTable' + (export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Groups[1].Value -replace '^(\w)', { export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Value.ToUpper() })  ?? ''),
            adminSettings: mask( 'config.public.larkTable' + (export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Groups[1].Value -replace '^(\w)', { export default defineEventHandler(async (event) => {
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
            industrySites: mask(config.public.larkTableIndustrySites ?? ''),
            users: mask(config.public.larkTableUsers ?? ''),
            newsContent: mask(config.public.larkTableNewsContent ?? ''),
            plansCoupons: mask(config.public.larkTablePlansCoupons ?? ''),
            adminSettings: mask(config.public.larkTableAdminSettings ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
.Value.ToUpper() })  ?? ''),
        },
        other: {
            jwtSecret: !!config.jwtSecret,
            deepseekApiKey: !!config.deepseekApiKey,
            cloudflareAccountId: !!config.cloudflareAccountId,
        },
        hint: 'If any value shows ❌ NOT SET, add the env var to Cloudflare Pages dashboard.'
    }
})
