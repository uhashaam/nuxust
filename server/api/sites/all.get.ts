import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const sites = await prisma.industrySite.findMany({
            where: { is_active: true }
        })

        return {
            success: true,
            sites: sites
                .filter((s: any) => s.industry_name)
                .map((s: any) => ({
                    id: s.id,
                    name: s.industry_name,
                    subdomain: s.subdomain || s.sub_domain
                }))
                .sort((a, b) => (a.subdomain||'').localeCompare(b.subdomain||''))
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch sites'
        })
    }
})
