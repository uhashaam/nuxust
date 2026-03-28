import { prisma } from './prisma';

export interface Plan {
    record_id: string;
    fields: {
        plan_id: string;
        plan_tier: string;
        weekly_publish_limit: number;
        daily_publish_limit: number;
        annual_price_usd: number;
        coupon_code?: string;
        coupon_discount?: number;
        validity_start?: number;
        validity_end?: number;
        coupon_status?: string;
    }
}

// Map Prisma Model to Plan Lark-style object
const mapPlan = (pPlan: any): Plan => {
    // Limits were stored in Lark as nested fields depending on the UI logic, but Prisma stores it as JSON string or explicitly.
    // Assuming UI translates Plan limits explicitly
    let limits: any = {};
    if (pPlan.limits) {
        try { limits = JSON.parse(pPlan.limits); } catch (e) {}
    }

    return {
        record_id: pPlan.id,
        fields: {
            plan_id: pPlan.id,
            plan_tier: pPlan.name,
            weekly_publish_limit: limits.weekly_publish_limit || 0,
            daily_publish_limit: limits.daily_publish_limit || 0,
            annual_price_usd: pPlan.price || 0,
            coupon_code: pPlan.code || undefined,
            coupon_discount: pPlan.discount_amount || undefined,
            validity_start: undefined,
            validity_end: pPlan.valid_until ? Number(pPlan.valid_until) : undefined,
            coupon_status: pPlan.is_active ? 'active' : 'inactive'
        }
    };
};

export const planRepository = {
    /**
     * Fetch all available plans/coupons
     */
    async getAllPlans(): Promise<Plan[]> {
        const plans = await prisma.planCoupon.findMany();
        return plans.map(mapPlan);
    },

    /**
     * Find a plan by its tier name (e.g., 'VIP1', 'VIP2')
     */
    async findByTier(tier: string): Promise<Plan | null> {
        const plan = await prisma.planCoupon.findFirst({
            where: {
                type: 'Plan',
                name: tier
            }
        });
        if (!plan) return null;
        return mapPlan(plan);
    },

    /**
     * Find a plan by its ID
     */
    async findById(planId: string | number): Promise<Plan | null> {
        const plan = await prisma.planCoupon.findUnique({
            where: { id: String(planId) }
        });
        if (!plan) return null;
        return mapPlan(plan);
    },

    /**
     * Update a plan or coupon
     */
    async updatePlan(recordId: string, updates: Partial<Plan['fields']>): Promise<Plan> {
        let updateData: any = {};
        
        if (updates.plan_tier) updateData.name = updates.plan_tier;
        if (updates.annual_price_usd !== undefined) updateData.price = updates.annual_price_usd;
        if (updates.coupon_code) updateData.code = updates.coupon_code;
        if (updates.coupon_discount !== undefined) updateData.discount_amount = updates.coupon_discount;
        if (updates.validity_end !== undefined) updateData.valid_until = updates.validity_end;
        if (updates.coupon_status) updateData.is_active = updates.coupon_status === 'active';

        // Partial limit updating
        if (updates.weekly_publish_limit !== undefined || updates.daily_publish_limit !== undefined) {
             const existing = await prisma.planCoupon.findUnique({ where: { id: recordId }});
             let newLimits: any = {};
             if (existing && existing.limits) {
                 try { newLimits = JSON.parse(existing.limits); } catch(e) {}
             }
             if (updates.weekly_publish_limit !== undefined) newLimits.weekly_publish_limit = updates.weekly_publish_limit;
             if (updates.daily_publish_limit !== undefined) newLimits.daily_publish_limit = updates.daily_publish_limit;
             updateData.limits = JSON.stringify(newLimits);
        }

        const plan = await prisma.planCoupon.update({
            where: { id: recordId },
            data: updateData
        });
        return mapPlan(plan);
    },

    /**
     * Delete a plan/coupon
     */
    async deletePlan(recordId: string): Promise<boolean> {
        await prisma.planCoupon.delete({
            where: { id: recordId }
        });
        return true;
    }
};
