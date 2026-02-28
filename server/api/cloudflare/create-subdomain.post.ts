export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { subdomain } = body;

    if (!subdomain) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Subdomain is required',
        });
    }

    // Basic validation for subdomain format
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(subdomain)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid subdomain format. Use only lowercase letters, numbers, and dashes.',
        });
    }

    const { createSubdomain, triggerRedeployment } = useCloudflare();
    const result = await createSubdomain(subdomain);

    if (!result.success) {
        throw createError({
            statusCode: 500,
            statusMessage: result.error || 'Failed to create subdomain',
        });
    }

    // After successfully creating the DNS/Subdomain, trigger a Cloudflare Pages redeploy 
    // so Nuxt SSG can fetch the new subdomain from Lark and build the static customized templates
    const deployResult = await triggerRedeployment();

    return {
        success: true,
        message: `Subdomain ${subdomain}.b-2b.com created successfully`,
        data: {
            dns: result,
            deploymentTrigger: deployResult
        }
    };
});
