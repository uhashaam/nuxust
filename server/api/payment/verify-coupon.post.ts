import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { code } = body;

    if (!code) {
        throw createError({ statusCode: 400, message: 'Coupon code is required' });
    }

    try {
        // Find the coupon in MySQL using Prisma
        const coupon = await prisma.planCoupon.findUnique({
            where: { code: code }
        });

        if (!coupon || coupon.type !== 'Coupon') {
            return { valid: false, message: 'Invalid coupon code' };
        }

        if (!coupon.is_active) {
            return { valid: false, message: 'Coupon is inactive or expired' };
        }

        // Return the valid coupon data so the frontend can display the discount
        return {
            valid: true,
            couponId: coupon.id,
            code: code,
            discountValue: coupon.discount_amount || 0,
            discountType: 'fixed' // Based on current schema simplicity
        };

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Failed to verify coupon'
        });
    }
});
