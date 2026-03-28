import Stripe from 'stripe';
import { userRepository } from '../../utils/userRepository';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    // Fetch settings from MySQL AdminSettings via Prisma
    let stripeSecretKey = config.stripeSecretKey; // Fallback to env
    let stripeWebhookSecret = config.stripeWebhookSecret;

    try {
        const settings = await prisma.adminSetting.findMany({
            where: {
                key: { in: ['stripe_secret_key', 'stripe_webhook_secret'] }
            }
        });

        for (const s of settings) {
            if (s.key === 'stripe_secret_key') stripeSecretKey = s.value;
            if (s.key === 'stripe_webhook_secret') stripeWebhookSecret = s.value;
        }

        if (!stripeSecretKey || !stripeWebhookSecret) {
            throw createError({ statusCode: 500, statusMessage: 'Stripe Credentials missing from Database Config' });
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2025-01-27.acacia'
        });

        const body = await readRawBody(event);
        const signature = getHeader(event, 'stripe-signature');

        if (!body || !signature) {
            throw createError({ statusCode: 400, statusMessage: 'Missing body or signature' });
        }

        let stripeEvent;
        try {
            stripeEvent = stripe.webhooks.constructEvent(
                body,
                signature,
                stripeWebhookSecret
            );
        } catch (err: any) {
            throw createError({ statusCode: 400, statusMessage: 'Webhook Error: ' + err.message });
        }

        // Handle the event
        switch (stripeEvent.type) {
            case 'checkout.session.completed': {
                const session = stripeEvent.data.object as Stripe.Checkout.Session;

                // Extract the user ID and plan ID from metadata
                const userId = session.metadata?.userId;
                const planId = session.metadata?.planId;

                if (userId && planId) {
                    // Map the planId to user_type and remaining posts limit
                    let newUserType: 'user' | 'vip1' | 'vip2' | 'vip3' | 'vip4' = 'user';
                    let postsToAdd = 0;

                    if (planId === 'pro' || planId === 'vip1') {
                        newUserType = 'vip1';
                        postsToAdd = 50;
                    } else if (planId === 'business' || planId === 'vip2') {
                        newUserType = 'vip2';
                        postsToAdd = 200;
                    } else if (planId === 'enterprise' || planId === 'vip3') {
                        newUserType = 'vip3';
                        postsToAdd = 9999;
                    }

                    try {
                        // Update user repository (already uses Prisma)
                        await userRepository.updateUser(userId, {
                            user_type: newUserType,
                            remaining_posts: postsToAdd
                        });
                    } catch (updateError) {
                        console.error('Failed to update user via webhook:', updateError);
                    }
                }
                break;
            }
            case 'customer.subscription.deleted':
                // Logic for downgrading users when subscription expires or is cancelled
                break;
            default:
                // Unhandled event type
        }

        return { received: true };
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Webhook internal error'
        });
    }
});
