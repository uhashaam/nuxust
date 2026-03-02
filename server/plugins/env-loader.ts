export default defineNitroPlugin((nitroApp) => {
    // Shim process.stdout and process.stderr for Cloudflare Worker environment stability
    // This prevents "TypeError: Cannot read private member #t" when dependencies access stdout
    if (typeof process !== 'undefined') {
        const mockStream = {
            write: () => true,
            on: () => { },
            once: () => { },
            emit: () => { },
            end: () => { },
            isTTY: false,
            writable: true,
            columns: 80,
            rows: 24
        };

        // Force override even if they exist, to bypass broken proxies
        try {
            Object.defineProperty(process, 'stdout', { value: mockStream, writable: true, configurable: true });
            Object.defineProperty(process, 'stderr', { value: mockStream, writable: true, configurable: true });
        } catch (e) {
            // Fallback for environments where Object.defineProperty might fail or be restricted
            (process as any).stdout = mockStream;
            (process as any).stderr = mockStream;
        }
    }

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
        config.public.larkTableIds.industrySites = process.env.LARK_TABLE_INDUSTRY_SITES
    }
    if (process.env.LARK_TABLE_USERS) {
        config.public.larkTableIds.users = process.env.LARK_TABLE_USERS
    }
    if (process.env.LARK_TABLE_PLANS_COUPONS) {
        config.public.larkTableIds.plansCoupons = process.env.LARK_TABLE_PLANS_COUPONS
    }
    if (process.env.LARK_TABLE_NEWS_CONTENT) {
        config.public.larkTableIds.newsContent = process.env.LARK_TABLE_NEWS_CONTENT
    }
    if (process.env.LARK_TABLE_ADMIN_SETTINGS) {
        config.public.larkTableIds.adminSettings = process.env.LARK_TABLE_ADMIN_SETTINGS
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
