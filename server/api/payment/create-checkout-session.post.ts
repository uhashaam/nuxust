import Stripe from 'stripe';
import { fetchRecords } from '../../utils/lark/base';

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

    // Fetch settings from Lark Base
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.larkTableAdminSettings;

    if (!appToken || !adminSettingsTableId) {
        throw createError({ statusCode: 500, message: 'Lark Base configuration missing for Admin Settings' });
    }

    const { records } = await fetchRecords(appToken, adminSettingsTableId);
    let stripeSecretKey = config.stripeSecretKey; // Fallback to env

    const secretRecord = records.find(r => r.fields['Key'] === 'stripe_secret_key' || r.fields['Setting Name'] === 'stripe_secret_key');
    if (secretRecord && secretRecord.fields['Value']) {
        stripeSecretKey = secretRecord.fields['Value'] as string;
    }

    if (!stripeSecretKey) {
        throw createError({ statusCode: 500, statusMessage: 'Stripe Secret Key is missing from Admin Config' });
    }

    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2025-01-27.acacia'
    });

    try {
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
