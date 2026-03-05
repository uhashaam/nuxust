export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    // Define keys we expect to see
    const keysToCheck = [
        'larkAppId',
        'larkAppSecret',
        'larkBaseAppToken',
        'jwtSecret',
        'feishuAppId',
        'larkTableUsers',
        'larkTableAdminSettings',
        'larkTableNewsContent',
        'larkTableIndustrySites',
        'larkTablePlansCoupons',
        'larkTableProducts',
        'larkBaseAppToken'
    ];

    const status = keysToCheck.reduce((acc, key) => {
        const val = config[key];
        acc[key] = !!val;
        if (val && typeof val === 'string') {
            acc[key + '_prefix'] = val.substring(0, 3) + '...';
        }
        return acc;
    }, {} as Record<string, any>);

    let newsRecordCount = 0;
    let newsSample = null;
    try {
        const res = await fetchRecords(config.larkBaseAppToken, config.larkTableNewsContent, { page_size: 10 });
        newsRecordCount = res.records.length;
        newsSample = res.records.map(r => ({
            id: r.record_id,
            title: r.fields.news_title,
            method: r.fields.generation_method
        }));
    } catch (e: any) {
        newsRecordCount = -1;
        newsSample = e.message;
    }

    return {
        production: process.env.NODE_ENV === 'production',
        timestamp: new Date().toISOString(),
        configStatus: status,
        newsStats: {
            count: newsRecordCount,
            sample: newsSample
        },
        // Add public config for reference
        public: config.public
    };
});
