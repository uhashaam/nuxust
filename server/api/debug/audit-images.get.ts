import { fetchAllRecords } from '../../utils/lark/base'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const newsTableId = config.public.larkTableIds.newsContent

        if (!appToken || !newsTableId) {
            throw createError({ statusCode: 500, message: 'Lark configuration missing' })
        }

        const news = await fetchAllRecords(appToken, newsTableId)

        const issues = news.map(n => {
            const img = n.fields.featured_image
            const title = n.fields.news_title
            const rid = n.record_id

            let status = 'OK'
            let detail = ''

            if (!img || (Array.isArray(img) && img.length === 0)) {
                status = 'Missing'
            } else if (Array.isArray(img)) {
                const first = img[0]
                if (!first.file_token && !first.url && !first.tmp_url) {
                    status = 'Broken'
                    detail = 'No valid URL or token in attachment'
                }
            } else if (typeof img === 'string') {
                if (img.startsWith('data:image')) {
                    status = 'Invalid (Base64)'
                    detail = 'Contains base64 instead of attachment/URL'
                }
            }

            return { rid, title, status, detail, rawImg: img }
        }).filter(i => i.status !== 'OK')

        return {
            totalChecked: news.length,
            issuesCount: issues.length,
            issues
        }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
})
