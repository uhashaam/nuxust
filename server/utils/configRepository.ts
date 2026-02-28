import { fetchRecords, createRecord, updateRecord, type LarkBaseRecord } from './lark/base';

export const configRepository = {
    async getGlobalConfig(): Promise<any> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        // Use adminSettings if available, otherwise fallback to newsContent for generic storage
        const tableId = config.public.larkTableIds.adminSettings || config.public.larkTableIds.newsContent;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        const { records } = await fetchRecords(appToken, tableId);

        // If using adminSettings (Key/Value structure)
        if (config.public.larkTableIds.adminSettings) {
            const result: Record<string, any> = {};
            records.forEach(r => {
                const key = r.fields['Key'] || r.fields['Setting Name'];
                const val = r.fields['Value'];
                if (key && key === 'company_config') {
                    try {
                        Object.assign(result, JSON.parse(val as string));
                    } catch (e) { }
                }
            });
            return Object.keys(result).length > 0 ? result : null;
        }

        // If using News Content fallback
        const record = records.find(r => r.fields.news_title === 'Global Configuration' && r.fields.generation_method === 'Config');
        if (record && record.fields.news_content) {
            try {
                return JSON.parse(record.fields.news_content);
            } catch (e) {
                return null;
            }
        }
        return null;
    },

    async updateGlobalConfig(configData: any): Promise<boolean> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const adminSettingsId = config.public.larkTableIds.adminSettings;
        const newsContentId = config.public.larkTableIds.newsContent;
        const tableId = adminSettingsId || newsContentId;

        const configJson = JSON.stringify(configData);

        if (adminSettingsId) {
            const { records } = await fetchRecords(appToken, tableId);
            const existing = records.find(r => (r.fields['Key'] || r.fields['Setting Name']) === 'company_config');
            if (existing) {
                await updateRecord(appToken, tableId, existing.record_id!, { 'Value': configJson });
            } else {
                await createRecord(appToken, tableId, { 'Key': 'company_config', 'Value': configJson });
            }
        } else {
            const { records } = await fetchRecords(appToken, tableId);
            const existing = records.find(r => r.fields.news_title === 'Global Configuration' && r.fields.generation_method === 'Config');
            const fields = {
                news_title: 'Global Configuration',
                news_content: configJson,
                generation_method: 'Config',
                release_time: Date.now(),
                release_status: 'Published'
            };
            if (existing) {
                await updateRecord(appToken, tableId, existing.record_id!, fields);
            } else {
                await createRecord(appToken, tableId, fields);
            }
        }

        // Trigger Cloudflare redeploy because global config affects the whole site (SSG)
        try {
            const { triggerRedeployment } = await import('./cloudflare');
            await triggerRedeployment();
        } catch (e) {
            // failed to trigger
        }

        return true;
    }
};
