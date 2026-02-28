import { planRepository } from '../../utils/planRepository'

export default defineEventHandler(async (event) => {
    try {
        const plans = await planRepository.getAllPlans()
        return {
            success: true,
            count: plans.length,
            plans: plans.map(p => ({
                record_id: p.record_id,
                fields: p.fields
            }))
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
})
