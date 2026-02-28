import { fetchAllRecords } from '../../utils/lark/base'
import { userAuth } from '../../utils/userAuth'

export default defineEventHandler(async (event) => {
    // 1. Authenticate
    const token = getCookie(event, 'auth_token')
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' })
    }

    const payload = userAuth.verifyToken(token)
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid session' })
    }

    const config = useRuntimeConfig()
    const appToken = config.larkBaseAppToken
    const newsTableId = config.public.larkTableIds.newsContent

    try {
        // Fetch all news records to extract images
        const records = await fetchAllRecords(appToken, newsTableId)

        const mediaItems = []
        const seenUrls = new Set()

        for (const record of records) {
            const featuredImage = record.fields.featured_image
            if (!featuredImage) continue

            let items = []
            if (Array.isArray(featuredImage)) {
                items = featuredImage
            } else if (typeof featuredImage === 'string' && featuredImage.startsWith('http')) {
                // Handle legacy string URLs if any
                items = [{ url: featuredImage, name: 'Imported Image' }]
            }

            for (const img of items) {
                const url = img.tmp_url || img.url
                const token = img.file_token || img.token

                if (url && !seenUrls.has(url)) {
                    seenUrls.add(url)
                    mediaItems.push({
                        id: token || Math.random().toString(36).substring(7),
                        url: url,
                        name: img.file_name || 'Untitled Asset',
                        alt: record.fields.news_title || '',
                        type: 'image/jpeg',
                        size: img.size || 0,
                        updatedAt: new Date().toISOString(),
                        token: token
                    })
                }
            }
        }

        return {
            success: true,
            media: mediaItems
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch media from Lark'
        })
    }
})
