
import { getRecord } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    // 1. URL Verification
    if (body.type === 'url_verification') {
        return {
            challenge: body.challenge
        };
    }

    // 2. Handle Base Record Change
    if (body.header && body.header.event_type === 'base.record.changed') {
        const eventData = body.event;
        const appToken = config.larkBaseAppToken;
        const industryTableId = config.public.larkTableIds.industrySites;
        const newsTableId = config.public.larkTableIds.newsContent;
        const plansTableId = config.public.larkTableIds.plansCoupons;


        if (!appToken) return { success: false, error: 'Missing app token' };

        // Handle Industry Site Changes (New or Updated)
        if (eventData.table_id === industryTableId) {
            // The event typically contains the changed fields array or we verify specifically
            const recordId = eventData.record_id;

            if (recordId) {
                try {
                    const record = await getRecord(appToken, industryTableId, recordId);
                    if (record && record.fields) {
                        const subdomain = record.fields['Subdomain'] || record.fields['subdomain'];

                        if (subdomain) {
                            // Provision DNS
                            const { createSubdomain } = useCloudflare();
                            const result = await createSubdomain(subdomain);

                            if (result.success) {
                                // Failed to provision
                            }
                        }
                    }
                } catch (error) {
                    // Error processing change
                }
            }
        } else if (eventData.table_id === newsTableId || eventData.table_id === plansTableId) {
            // Content table updated
            const { triggerRedeployment } = useCloudflare();
            const result = await triggerRedeployment();

            if (result.success) {
                // Successfully triggered
            } else {
                // Failed to trigger
            }
        }

        return { success: true };
    }

    return { message: 'Event logged' };
});
