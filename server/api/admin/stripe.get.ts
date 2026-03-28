import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth (Add checks if necessary)
    
    try {
        // Fetch values from MySQL via Prisma
        const settings = await prisma.adminSetting.findMany({
            where: {
                key: {
                    in: ['stripe_secret_key', 'stripe_webhook_secret', 'stripe_publishable_key']
                }
            }
        });

        const stripeConfig: Record<string, string> = {
            stripe_secret_key: '',
            stripe_webhook_secret: '',
            stripe_publishable_key: ''
        };

        // Populate and mask sensitive keys
        settings.forEach(s => {
            if (s.key === 'stripe_secret_key' || s.key === 'stripe_webhook_secret') {
                stripeConfig[s.key] = s.value ? '********' : '';
            } else if (s.key === 'stripe_publishable_key') {
                stripeConfig[s.key] = s.value || '';
            }
        });

        return {
            success: true,
            config: stripeConfig
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: 'Failed to fetch Stripe Configuration' });
    }
});
