import { fetchAllRecords } from '../../utils/lark/base'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const tableId = config.public.larkTableIds.industrySites

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, message: 'Lark configuration missing' })
        }

        const sites = await fetchAllRecords(appToken, tableId)

        return {
            success: true,
            sites: sites
                .filter(s => s.fields["Industry Name"] || s.fields.industry_name)
                .map(s => ({
                    id: s.record_id,
                    name: s.fields["Industry Name"] || s.fields.industry_name,
                    subdomain: s.fields.Subdomain || s.fields.subdomain
                }))
                .sort((a, b) => a.subdomain.localeCompare(b.subdomain))
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch sites'
        })
    }
})
