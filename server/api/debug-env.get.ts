export default defineEventHandler((event) => {
    const config = useRuntimeConfig()

    return {
        timestamp: new Date().toISOString(),
        status: 'debug_info_active',
        config_values_present: {
            larkBaseAppToken: !!config.larkBaseAppToken,
            feishuAppId: !!config.public.feishuAppId,
            feishuAppSecret: !!config.public.feishuAppSecret,
            industrySitesTable: !!config.public.larkTableIds?.industrySites,
            usersTable: !!config.public.larkTableIds?.users,
            newsTable: !!config.public.larkTableIds?.newsContent,
            cloudflareAccountId: !!config.cloudflareAccountId,
            deepseekApiKey: !!config.deepseekApiKey
        }
    }
})
