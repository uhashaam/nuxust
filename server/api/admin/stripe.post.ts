import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth (Add checks if necessary)
    const body = await readBody(event);

    try {
        const keysToUpdate = [];
        
        if (body.stripe_publishable_key !== undefined) {
            keysToUpdate.push('stripe_publishable_key');
        }

        // Process secrets only if they are not the masked placeholder
        if (body.stripe_secret_key && body.stripe_secret_key !== '********') {
            keysToUpdate.push('stripe_secret_key');
        }
        if (body.stripe_webhook_secret && body.stripe_webhook_secret !== '********') {
            keysToUpdate.push('stripe_webhook_secret');
        }

        // Loop through keys and upsert in MySQL via Prisma
        for (const key of keysToUpdate) {
            const value = body[key] ? String(body[key]) : '';

            await prisma.adminSetting.upsert({
                where: { key: key },
                update: { value: value },
                create: { key: key, value: value }
            });
        }

        return {
            success: true,
            message: 'Stripe Configuration saved successfully'
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: 'Failed to save Stripe Configuration' });
    }
});
