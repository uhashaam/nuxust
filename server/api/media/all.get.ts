import { userAuth } from '../../utils/userAuth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    // 1. Authenticate
    const token = getCookie(event, 'auth_token')
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' })
    }

    const payload = await userAuth.verifyToken(token)
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid session' })
    }

    try {
        // Fetch all news records from MySQL to extract images
        const records = await prisma.newsContent.findMany({
            where: { thumbnail: { not: null } }
        })

        const mediaItems = []
        const seenUrls = new Set()

        for (const record of records) {
            const featuredImage = record.thumbnail
            if (!featuredImage) continue

            let items = []
            if (Array.isArray(featuredImage)) {
                items = featuredImage
            } else if (typeof featuredImage === 'object') {
                items = [featuredImage]
            }

            for (const img of items) {
                const url = img.url || img.tmp_url
                const fileToken = img.file_token || img.token

                if (url && !seenUrls.has(url)) {
                    seenUrls.add(url)
                    mediaItems.push({
                        id: fileToken || Math.random().toString(36).substring(7),
                        url: url,
                        name: img.file_name || 'Untitled Asset',
                        alt: record.title || '',
                        type: 'image/jpeg',
                        size: img.size || 0,
                        updatedAt: record.updatedAt.toISOString(),
                        token: fileToken
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
            message: error.message || 'Failed to fetch media from Database'
        })
    }
})
