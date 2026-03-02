export const useCloudflare = () => {
    const config = useRuntimeConfig();
    const accountId = config.cloudflareAccountId;
    const zoneId = config.cloudflareZoneId;
    const projectName = config.cloudflareProjectName;
    const apiToken = config.cloudflareApiToken;

    const cfFetch = async (endpoint: string, options: any = {}) => {
        if (!apiToken) {
            throw new Error('Cloudflare API Token missing');
        }
        const response = await fetch(`https://api.cloudflare.com/client/v4${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || JSON.stringify(data));
        }
        return data;
    };

    /**
     * Create a DNS record for a new industry site
     */
    const createSubdomain = async (subdomain: string) => {
        try {
            const data = await cfFetch(`/zones/${zoneId}/dns_records`, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'CNAME',
                    name: subdomain,
                    content: 'b-2b.pages.dev', // Assuming Cloudflare Pages deployment
                    proxied: true,
                    comment: `Created via B2B Platform Automation for ${subdomain}`
                })
            });

            return {
                success: true,
                recordId: data.result.id,
                name: data.result.name,
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
     */
    const triggerRedeployment = async () => {
        try {
            if (!accountId || !projectName) {
                return { success: false, error: 'Credentials or Project Name missing' };
            }

            const data = await cfFetch(`/accounts/${accountId}/pages/projects/${projectName}/deployments`, {
                method: 'POST'
            });

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
     */
    const checkSSLStatus = async (subdomain: string) => {
        try {
            const data = await cfFetch(`/zones/${zoneId}/dns_records?name=${subdomain}.b-2b.com`);

            if (data.result && data.result.length > 0) {
                return {
                    active: true,
                    status: 'active',
                    proxied: data.result[0].proxied
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
