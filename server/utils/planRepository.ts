import { fetchAllRecords, type LarkBaseRecord } from './lark/base';

export interface Plan extends LarkBaseRecord {
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

export const planRepository = {
    /**
     * Fetch all available plans from Lark Base
     */
    async getAllPlans(): Promise<Plan[]> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.public.larkTablePlansCoupons;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing for plans' });
        }

        try {
            const records = await fetchAllRecords(appToken, tableId);
            return records as Plan[];
        } catch (error) {
            return [];
        }
    },

    /**
     * Find a plan by its tier name (e.g., 'VIP1', 'VIP2')
     */
    async findByTier(tier: string): Promise<Plan | null> {
        const plans = await this.getAllPlans();
        return plans.find(p => p.fields.plan_tier && p.fields.plan_tier.toLowerCase() === tier.toLowerCase()) || null;
    },

    /**
     * Find a plan by its ID
     */
    async findById(planId: string | number): Promise<Plan | null> {
        const plans = await this.getAllPlans();
        return plans.find(p => String(p.fields.plan_id) === String(planId)) || null;
    },

    /**
     * Update a plan or coupon in Lark Base
     */
    async updatePlan(recordId: string, updates: Partial<Plan['fields']>): Promise<Plan> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.public.larkTablePlansCoupons;

        const { updateRecord } = await import('./lark/base');
        const record = await updateRecord(appToken, tableId, recordId, updates);
        return record as Plan;
    },

    /**
     * Delete a plan/coupon from Lark Base
     */
    async deletePlan(recordId: string): Promise<boolean> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.public.larkTablePlansCoupons;

        const { deleteRecord } = await import('./lark/base');
        return await deleteRecord(appToken, tableId, recordId);
    }
};
