import { fetchRecords, updateRecord } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { code } = body;

    if (!code) {
        throw createError({ statusCode: 400, message: 'Coupon code is required' });
    }

    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.larkTablePlansCoupons;

    if (!appToken || !tableId) {
        throw createError({ statusCode: 500, message: 'Lark Base configuration missing' });
    }

    try {
        // Find the coupon in Lark
        const filter = `CurrentValue.[Coupon Code] = "${code}"`;
        const result = await fetchRecords(appToken, tableId, { filter, page_size: 1 });

        if (!result.records || result.records.length === 0) {
            return { valid: false, message: 'Invalid coupon code' };
        }

        const couponRecord = result.records[0];
        const status = couponRecord.fields['Status'] || couponRecord.fields['status'];
        const discountValue = couponRecord.fields['Discount Value'] || couponRecord.fields['discount_value'] || 0;

        if (status === 'Used' || status === 'Expired' || status === 'Inactive') {
            return { valid: false, message: `Coupon is ${status.toLowerCase()}` };
        }

        // Return the valid coupon data so the frontend can display the discount
        // The actual deduction/marking as "used" will happen in the webhook when payment succeeds
        return {
            valid: true,
            couponId: couponRecord.record_id,
            code: code,
            discountValue: discountValue,
            discountType: couponRecord.fields['Discount Type'] || couponRecord.fields['discount_type'] || 'fixed'
        };

    } catch (error: any) {
        
        throw createError({
            statusCode: 500,
            message: 'Failed to verify coupon'
        });
    }
});
