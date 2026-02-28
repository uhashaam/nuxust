
import { batchCreateRecords } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIds.plansCoupons;

    if (!appToken || !tableId) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Lark Base configuration missing (appToken or plansCoupons tableId)'
        });
    }

    // Predefined Plans from Implementation Plan
    const plans = [
        {
            "Plan ID": "plan_vip1",
            "Plan Tier": "VIP1",
            "Weekly/Daily Publish Limit": "1/week",
            "Annual Price (USD)": 20,
            "Validity Period (Days)": 365,
            "Coupon Status": "Active" // reusing field or separate? Schema says 'Coupon Status'
        },
        {
            "Plan ID": "plan_vip2",
            "Plan Tier": "VIP2",
            "Weekly/Daily Publish Limit": "1/day",
            "Annual Price (USD)": 100,
            "Validity Period (Days)": 365,
            "Coupon Status": "Active"
        },
        {
            "Plan ID": "plan_vip3",
            "Plan Tier": "VIP3",
            "Weekly/Daily Publish Limit": "2/day",
            "Annual Price (USD)": 150,
            "Validity Period (Days)": 365,
            "Coupon Status": "Active"
        },
        {
            "Plan ID": "plan_vip4",
            "Plan Tier": "VIP4",
            "Weekly/Daily Publish Limit": "3/day",
            "Annual Price (USD)": 200,
            "Validity Period (Days)": 365,
            "Coupon Status": "Active"
        }
    ];

    const records = plans.map(plan => ({
        fields: {
            "Plan ID": plan["Plan ID"],
            "Plan Tier": plan["Plan Tier"],
            "Weekly/Daily Publish Limit": plan["Weekly/Daily Publish Limit"],
            "Annual Price (USD)": plan["Annual Price (USD)"],
            // "Validity Period (Start/End)": ??? format depends on Lark, usually Date range or just text
            // For simplicity in this seed, we might skip complex fields or assume text
        }
    }));

    try {
        // Check if plans exist first? For simplicity, we just create. 
        // Steps to properly implementing would involve checking existence.
        // Here we assume empty table for initial seed.
        const results = await batchCreateRecords(appToken, tableId, records);
        return { success: true, count: results.length };
    } catch (error: any) {
        // console.error('Seed plans error:', error);
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
});
