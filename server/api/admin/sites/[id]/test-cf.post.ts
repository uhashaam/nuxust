import { prisma } from '../../../../utils/prisma';
import { useCloudflare } from '../../../../utils/cloudflare';

/**
 * POST /api/admin/sites/:id/test-cf — Test a site's Cloudflare API token
 */
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ statusCode: 400, message: 'Site ID required' });

    try {
        const site = await prisma.industrySite.findUnique({ where: { id } });
        if (!site) throw createError({ statusCode: 404, message: 'Site not found' });

        const cfToken = (site as any).cf_api_token;
        const cfAccountId = (site as any).cf_account_id;

        if (!cfToken) {
            return { success: false, error: 'No CF API Token configured for this site' };
        }

        const cf = useCloudflare({
            accountId: cfAccountId,
            apiToken: cfToken,
            zoneId: (site as any).cf_zone_id,
        });

        // Test the token
        const tokenResult = await cf.testToken();
        
        // If token is valid and we have account ID, also fetch account info
        let accountInfo = null;
        if (tokenResult.success && cfAccountId) {
            accountInfo = await cf.getAccountInfo();
        }

        return {
            success: tokenResult.success,
            token: tokenResult,
            account: accountInfo,
        };
    } catch (error: any) {
        if (error.statusCode) throw error;
        throw createError({ statusCode: 500, message: error.message });
    }
});
