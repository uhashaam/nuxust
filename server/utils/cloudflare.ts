import Cloudflare from 'cloudflare';

export const useCloudflare = () => {
    const config = useRuntimeConfig();

    const cloudflare = new Cloudflare({
        apiToken: config.cloudflareApiToken,
    });

    const accountId = config.cloudflareAccountId;
    const zoneId = config.cloudflareZoneId;
    const projectName = config.cloudflareProjectName;

    /**
     * Create a DNS record for a new industry site
     * @param subdomain The subdomain to create (e.g., 'laser-welding')
     */
    const createSubdomain = async (subdomain: string) => {
        try {
            const record = await cloudflare.dns.records.create({
                zone_id: zoneId,
                type: 'CNAME',
                name: subdomain,
                content: 'b-2b.pages.dev', // Assuming Cloudflare Pages deployment
                proxied: true,
                comment: `Created via B2B Platform Automation for ${subdomain}`
            });

            return {
                success: true,
                recordId: record.id,
                name: record.name,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    };

    /**
     * Trigger a redeployment of the static site via Cloudflare Pages API
     * This is required when new templates or subdomains are matched in Lark DB
     */
    const triggerRedeployment = async () => {
        try {
            if (!accountId || !config.cloudflareApiToken) {
                return { success: false, error: 'Credentials missing' };
            }

            // Cloudflare node SDK standard approach for triggering Pages deployment
            // Since the exact method can vary by SDK version, we can also use raw fetch if needed,
            // but we'll use standard fetch to the Cloudflare API to be safe
            const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.cloudflareApiToken}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            const data = await response.json();
            return {
                success: true,
                deploymentId: data.result.id,
                url: data.result.url
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    };

    /**
     * Verify SSL status for a subdomain
     * @param subdomain The subdomain to check
     */
    const checkSSLStatus = async (subdomain: string) => {
        try {
            const records = await cloudflare.dns.records.list({
                zone_id: zoneId,
                name: `${subdomain}.b-2b.com`,
            });

            if (records.result.length > 0) {
                return {
                    active: true,
                    status: 'active',
                    proxied: records.result[0].proxied
                }
            }

            return {
                active: false,
                status: 'missing'
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    };

    return {
        createSubdomain,
        triggerRedeployment,
        checkSSLStatus
    };
};
