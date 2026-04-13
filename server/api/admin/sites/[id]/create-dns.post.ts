import { prisma } from '../../../../utils/prisma';
import { useCloudflare } from '../../../../utils/cloudflare';

/**
 * POST /api/admin/sites/:id/create-dns — Create CNAME DNS record in Cloudflare
 * 
 * Note: The DNS record is created in the MAIN b-2b.com CF account (the one that
 * owns the zone), not in the subdomain's own CF account. The subdomain CF accounts
 * host the Pages project / Workers, while DNS stays in the domain owner's zone.
 */
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ statusCode: 400, message: 'Site ID required' });

    try {
        const site = await prisma.industrySite.findUnique({ where: { id } });
        if (!site) throw createError({ statusCode: 404, message: 'Site not found' });

        const subdomain = (site as any).subdomain || (site as any).sub_domain;
        if (!subdomain) throw createError({ statusCode: 400, message: 'Site has no subdomain' });

        // Use the MAIN account's credentials (from env) for DNS creation,
        // since b-2b.com zone lives in the main CF account
        const cf = useCloudflare();

        // Check if record already exists
        const existing = await cf.checkDnsRecord(subdomain);
        if (existing.exists) {
            // Mark as created in DB
            await prisma.industrySite.update({
                where: { id },
                data: { cf_dns_created: true }
            });
            return {
                success: true,
                message: `DNS record for ${subdomain}.b-2b.com already exists`,
                existing: true,
                record: existing.record,
            };
        }

        // Create the CNAME record
        const result = await cf.createSubdomain(subdomain);

        if (result.success) {
            // Mark DNS as created in DB
            await prisma.industrySite.update({
                where: { id },
                data: { cf_dns_created: true, ssl_status: 'pending' }
            });
        }

        return {
            success: result.success,
            message: result.success
                ? `DNS CNAME created: ${subdomain}.b-2b.com → b-2b.pages.dev`
                : `Failed: ${(result as any).error}`,
            record: result,
        };
    } catch (error: any) {
        if (error.statusCode) throw error;
        throw createError({ statusCode: 500, message: error.message });
    }
});
