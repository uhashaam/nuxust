import fs from 'fs'
import path from 'path'
import { userAuth } from '../../utils/userAuth'

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

    // 2. Parse Multipart Form Data
    const formData = await readMultipartFormData(event)
    if (!formData) {
        throw createError({ statusCode: 400, message: 'No file uploaded' })
    }

    const file = formData.find(f => f.name === 'file')
    if (!file || !file.data) {
        throw createError({ statusCode: 400, message: 'File data is missing' })
    }

    try {
        // 3. Save file locally to public/uploads
        const fileName = `${Date.now()}-${file.filename || 'upload.png'}`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, fileName)
        fs.writeFileSync(filePath, file.data)

        const publicUrl = `/uploads/${fileName}`

        return {
            success: true,
            fileToken: fileName, // Use filename as token for now
            url: publicUrl
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to save media locally'
        })
    }
})
