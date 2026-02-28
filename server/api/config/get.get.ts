import { configRepository } from '../../utils/configRepository'

export default defineEventHandler(async (event) => {
    try {
        const config = await configRepository.getGlobalConfig()
        return {
            success: true,
            config
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch config'
        })
    }
})
