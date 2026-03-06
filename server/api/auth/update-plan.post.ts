import { userRepository } from '../../utils/userRepository'
import { planRepository } from '../../utils/planRepository'

export default defineEventHandler(async (event) => {
    // 1. Authenticate via cookie JWT
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' });
    }
    const payload = await userAuth.verifyToken(token);
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }

    try {
        const body = await readBody(event)
        const { planId } = body

        if (!planId) {
            throw createError({ statusCode: 400, message: 'Plan ID is required' })
        }

        // 2. Fetch plan details from Lark to get limits/tier
        const plan = await planRepository.findById(planId)
        if (!plan) {
            throw createError({ statusCode: 404, message: 'Plan not found' })
        }

        // 3. Get the user record from Lark
        const larkUser = await userRepository.findByUsernameOrEmail(payload.username)
        if (!larkUser) {
            throw createError({ statusCode: 404, message: 'User record not found' })
        }

        // 4. Update the user record in Lark Base
        // Set new user_type and reset/add remaining posts (28-day supply)
        // Note: daily_publish_limit and weekly_publish_limit are both handled
        let newPosts = 0
        if (plan.fields.daily_publish_limit && plan.fields.daily_publish_limit > 0) {
            newPosts = plan.fields.daily_publish_limit * 28
        } else if (plan.fields.weekly_publish_limit && plan.fields.weekly_publish_limit > 0) {
            newPosts = plan.fields.weekly_publish_limit * 4
        } else if (plan.fields.plan_tier?.toLowerCase() === 'admin') {
            newPosts = 9999
        }

        await userRepository.updateUser(larkUser.record_id!, {
            user_type: plan.fields.plan_tier as any,
            remaining_posts: newPosts
        })

        return {
            success: true,
            user: {
                username: larkUser.fields.username,
                newPlan: plan.fields.plan_tier,
                remainingPosts: newPosts
            }
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to upgrade plan'
        })
    }
})
