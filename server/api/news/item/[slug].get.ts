import { fetchAllRecords } from '../../../utils/lark/base'

export default defineEventHandler(async (event) => {
    try {
        const identifier = getRouterParam(event, 'slug')
        if (!identifier) {
            throw createError({ statusCode: 400, message: 'News identifier (slug or ID) is required' })
        }

        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const newsTableId = config.public.larkTableNewsContent

        if (!appToken || !newsTableId) {
            throw createError({ statusCode: 500, message: 'Lark configuration missing' })
        }

        const [news, sites] = await Promise.all([
            fetchAllRecords(appToken, newsTableId),
            fetchAllRecords(appToken, config.public.larkTableIndustrySites)
        ])

        const record = news.find(n => n.record_id === identifier || n.fields.slug === identifier || `news-${n.record_id}` === identifier)

        if (!record || !record.fields.news_title || !record.fields.news_content) {
            throw createError({ statusCode: 404, message: 'Article not found or incomplete' })
        }

        const siteMap = new Map(sites.map(s => [s.record_id, { name: s.fields.industry_name, subdomain: s.fields.subdomain }]))

        const releaseTime = record.fields.release_time
        let dateStr = ''
        if (releaseTime) {
            const ts = Number(releaseTime)
            const date = new Date(ts > 10000000000 ? ts : ts * 1000)
            dateStr = date.toISOString().split('T')[0] as string
        }

        // Resolve category and subdomain
        const siteIdsField = record.fields.site_id || []
        let category = 'Industry'
        let subdomain = ''
        for (const sf of siteIdsField) {
            const rid = typeof sf === 'string' ? sf : (sf.record_id || sf.record_ids?.[0])
            if (rid && siteMap.has(rid)) {
                const site = siteMap.get(rid)
                category = site.name as string
                subdomain = site.subdomain as string
                break
            }
        }

        // Resolve image: Use Lark attachment if exists, otherwise fallback to placeholder
        const featuredImgField = record.fields.featured_image
        let imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'

        if (featuredImgField && Array.isArray(featuredImgField) && featuredImgField.length > 0) {
            const img = featuredImgField[0]
            imageUrl = img.tmp_url || img.url || imageUrl
        }

        return {
            success: true,
            article: {
                id: record.record_id,
                title: record.fields.news_title,
                content: record.fields.news_content,
                publishedAt: dateStr,
                status: record.fields.release_status,
                category: category as string,
                subdomain: subdomain,
                excerpt: record.fields.news_content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                image: imageUrl,
                author: 'Staff Writer',
                slug: record.fields.slug || `news-${record.record_id}`,
                tags: []
            }
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch article'
        })
    }
})
