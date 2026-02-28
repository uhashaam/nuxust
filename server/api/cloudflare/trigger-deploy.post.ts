export default defineEventHandler(async (event) => {
    // Basic auth check if needed
    // const query = getQuery(event);
    // if (query.secret !== process.env.CRON_SECRET) {
    //     throw createError({ statusCode: 401, message: 'Unauthorized' });
    // }

    const { triggerRedeployment } = useCloudflare();
    
    // Trigger deployment
    const deployResult = await triggerRedeployment();

    if (!deployResult.success) {
        throw createError({
            statusCode: 500,
            statusMessage: deployResult.error || 'Failed to trigger redeployment',
        });
    }

    return {
        success: true,
        message: `Cloudflare Pages redeployment triggered successfully.`,
        data: deployResult
    };
});
