import { getTenantAccessToken } from '../../utils/lark/auth'

export default defineEventHandler(async (event) => {
    const token = getRouterParam(event, 'token')
    if (!token) {
        throw createError({ statusCode: 400, message: 'Missing token' })
    }

    try {
        const accessToken = await getTenantAccessToken()

        // Fetch binary data from Lark Drive API
        // Note: bitable attachments use drive media download endpoint
        const response = await fetch(`https://open.larksuite.com/open-apis/drive/v1/medias/${token}/download`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            console.error(`Lark media download failed for token ${token}: ${response.status} ${response.statusText}`)
            throw createError({ statusCode: response.status, message: 'Failed to fetch image from Lark' })
        }

        const buffer = await response.arrayBuffer()
        const contentType = response.headers.get('content-type') || 'image/jpeg'

        setResponseHeader(event, 'Content-Type', contentType)
        // Cache heavily since tokens map to immutable file versions
        setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

        return Buffer.from(buffer)
    } catch (e: any) {
        console.error('Image Proxy Error:', e.message)
        throw createError({ statusCode: 500, message: 'Internal Server Error fetching image' })
    }
})
