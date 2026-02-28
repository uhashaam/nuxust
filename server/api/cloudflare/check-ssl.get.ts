export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const subdomain = query.subdomain as string;

    if (!subdomain) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Subdomain is required',
        });
    }

    const { checkSSLStatus } = useCloudflare();
    const result = await checkSSLStatus(subdomain);

    return {
        subdomain,
        ssl_status: result.status,
        details: result
    };
});
