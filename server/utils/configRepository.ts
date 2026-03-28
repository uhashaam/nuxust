import { prisma } from './prisma';

export const configRepository = {
    async getGlobalConfig(): Promise<any> {
        const settings = await prisma.adminSetting.findMany({
            where: { key: 'company_config' }
        });
        
        if (settings && settings.length > 0) {
            try {
                return JSON.parse(settings[0].value);
            } catch (e) {
                return null;
            }
        }
        return null;
    },

    async updateGlobalConfig(configData: any): Promise<boolean> {
        const configJson = JSON.stringify(configData);

        const existing = await prisma.adminSetting.findUnique({
            where: { key: 'company_config' }
        });

        if (existing) {
            await prisma.adminSetting.update({
                where: { id: existing.id },
                data: { value: configJson }
            });
        } else {
            await prisma.adminSetting.create({
                data: { key: 'company_config', value: configJson }
            });
        }

        // Trigger Cloudflare redeploy because global config affects the whole site
        try {
            const { triggerRedeployment } = await import('./cloudflare');
            await triggerRedeployment();
        } catch (e) {
            // failed to trigger
        }

        return true;
    }
};
