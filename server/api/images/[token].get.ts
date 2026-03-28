import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const token = getRouterParam(event, 'token')
    if (!token) {
        throw createError({ statusCode: 400, message: 'Missing file token' })
    }

    try {
        // Check if the token matches a local file in public/uploads/
        // (In the new system, we use the filename as the token)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const filePath = path.join(uploadDir, token)

        if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath)
            const ext = path.extname(token).toLowerCase()
            const mimeTypes: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml'
            }
            
            setResponseHeader(event, 'Content-Type', mimeTypes[ext] || 'image/jpeg')
            setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
            return buffer
        }

        // If not found locally and legacy Lark tokens are requested, return a 404
        throw createError({ statusCode: 404, message: 'Image not found in new storage system' })

    } catch (e: any) {
        if (e.statusCode === 404) throw e
        throw createError({ statusCode: 500, message: 'Internal Server Error fetching image' })
    }
})
