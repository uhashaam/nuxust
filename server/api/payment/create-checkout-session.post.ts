import Stripe from 'stripe';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { planId, priceId, userId, successUrl, cancelUrl } = body;

    if (!priceId || !userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing requisite payment parameters'
        });
    }

    const config = useRuntimeConfig();

    // Fetch stripe secret key from MySQL AdminSettings via Prisma
    let stripeSecretKey = config.stripeSecretKey; // Fallback to env

    try {
        const stripeSetting = await prisma.adminSetting.findUnique({
            where: { key: 'stripe_secret_key' }
        });

        if (stripeSetting && stripeSetting.value) {
            stripeSecretKey = stripeSetting.value;
        }

        if (!stripeSecretKey) {
            throw createError({ statusCode: 500, statusMessage: 'Stripe Secret Key is missing from Database Config' });
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2025-01-27.acacia'
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: successUrl || `${config.public.siteUrl}/dashboard?payment=success`,
            cancel_url: cancelUrl || `${config.public.siteUrl}/pricing?payment=cancelled`,
            client_reference_id: userId,
            metadata: {
                userId: userId,
                planId: planId
            }
        });

        return {
            success: true,
            url: session.url
        };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to create checkout session'
        });
    }
});
