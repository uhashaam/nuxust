import { planRepository } from '../../utils/planRepository'

export default defineEventHandler(async (event) => {
    try {
        const plans = await planRepository.getAllPlans()
        // Filter out empty rows (sometimes Lark returns rows with just an ID)
        const allowedTiers = ['vip1', 'vip2', 'vip3', 'vip4']

        const validPlans = plans.filter(p =>
            p.fields.plan_id &&
            p.fields.plan_tier &&
            allowedTiers.includes(p.fields.plan_tier.toLowerCase())
        )

        // Sort by tier suffix (1, 2, 3, 4)
        validPlans.sort((a, b) => {
            const tierA = a.fields.plan_tier?.toLowerCase() || ''
            const tierB = b.fields.plan_tier?.toLowerCase() || ''
            return tierA.localeCompare(tierB)
        })

        return {
            success: true,
            plans: validPlans.map(p => {
                const dailyLimit = p.fields.daily_publish_limit || 0
                const weeklyLimit = p.fields.weekly_publish_limit || 0

                let limitText = ''
                if (dailyLimit > 0) {
                    limitText = `${dailyLimit} article${dailyLimit > 1 ? 's' : ''} per day`
                } else if (weeklyLimit > 0) {
                    limitText = `${weeklyLimit} article${weeklyLimit > 1 ? 's' : ''} per week`
                }

                return {
                    id: p.fields.plan_id,
                    name: p.fields.plan_tier,
                    price: p.fields.annual_price_usd || 0,
                    limit: limitText,
                    weeklyLimit,
                    dailyLimit,
                    couponCode: p.fields.coupon_code || '',
                    couponDiscount: p.fields.coupon_discount || 0,
                    couponStatus: p.fields.coupon_status || 'Invalid'
                }
            })
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch plans'
        })
    }
})
