import { uploadAttachment } from '../../utils/lark/base'
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
        throw createError({ statusCode: 400, message: 'File field is missing' })
    }

    const config = useRuntimeConfig()
    const appToken = config.larkBaseAppToken
    const tableId = config.larkTableNewsContent

    try {
        // 3. Upload to Lark
        const fileToken = await uploadAttachment(appToken, tableId, {
            fileName: file.filename || 'upload.png',
            contentType: file.type || 'image/png',
            buffer: file.data
        })

        return {
            success: true,
            fileToken,
            url: '' // Lark doesn't give a direct public URL for attachments easily, but we have the token
        }
    } catch (error: any) {
        // error logging removed for cloudflare compatibility


        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to upload media to Lark'
        })
    }
})
