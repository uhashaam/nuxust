/**
 * useCloudflare - Per-site Cloudflare API utility
 *
 * Accepts optional siteCredentials to use a specific subdomain's CF account.
 * Falls back to the global env vars (main site account) if not provided.
 */
export const useCloudflare = (siteCredentials?: {
    accountId?: string;
    apiToken?: string;
    zoneId?: string;
}) => {
    const config = useRuntimeConfig();

    // Per-site credentials override global env vars
    const accountId  = siteCredentials?.accountId || (config as any).cloudflareAccountId || '';
    const zoneId     = siteCredentials?.zoneId     || (config as any).cloudflareZoneId    || '';
    const apiToken   = siteCredentials?.apiToken   || (config as any).cloudflareApiToken  || '';
    const projectName = (config as any).cloudflareProjectName || 'b-2b';

    /**
     * Core fetch wrapper for the Cloudflare API
     */
    const cfFetch = async (endpoint: string, options: RequestInit = {}) => {
        if (!apiToken) {
            throw new Error('Cloudflare API Token is missing. Please configure it in Site Settings.');
        }
        const response = await fetch(`https://api.cloudflare.com/client/v4${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        });
        const data = await response.json() as any;
        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || JSON.stringify(data));
        }
        return data;
    };

    /**
     * Verify the API token is valid and return account info
     */
    const testToken = async () => {
        try {
            const data = await cfFetch('/user/tokens/verify');
            return {
                success: true,
                status: data.result?.status,
                message: `Token is ${data.result?.status}`,
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Get account details (name, plan, etc.)
     */
    const getAccountInfo = async () => {
        try {
            const data = await cfFetch(`/accounts/${accountId}`);
            return {
                success: true,
                account: {
                    id: data.result.id,
                    name: data.result.name,
                    type: data.result.type,
                }
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Create a DNS CNAME record for a subdomain pointing to the main
     * Hostinger Node.js deployment (b-2b.com).
     * Uses the MAIN site's zoneId (since b-2b.com lives in the main CF account).
     */
    const createSubdomain = async (subdomain: string, targetZoneId?: string) => {
        const resolvedZoneId = targetZoneId || zoneId;
        if (!resolvedZoneId) {
            return { success: false, error: 'Zone ID is required to create a DNS record' };
        }
        try {
            const data = await cfFetch(`/zones/${resolvedZoneId}/dns_records`, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'CNAME',
                    name: subdomain,
                    content: 'b-2b.com',
                    proxied: true,
                    comment: `B2B Platform — auto-created for ${subdomain}`
                })
            });
            return {
                success: true,
                recordId: data.result.id,
                name: data.result.name,
                content: data.result.content,
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Check if a CNAME DNS record already exists for a subdomain
     */
    const checkDnsRecord = async (subdomain: string, targetZoneId?: string) => {
        const resolvedZoneId = targetZoneId || zoneId;
        if (!resolvedZoneId) return { exists: false, error: 'Zone ID missing' };
        try {
            const data = await cfFetch(`/zones/${resolvedZoneId}/dns_records?name=${subdomain}.b-2b.com&type=CNAME`);
            const exists = data.result && data.result.length > 0;
            return {
                exists,
                record: exists ? data.result[0] : null,
            };
        } catch (error: any) {
            return { exists: false, error: error.message };
        }
    };

    /**
     * Check SSL status for a subdomain
     */
    const checkSSLStatus = async (subdomain: string, targetZoneId?: string) => {
        const resolvedZoneId = targetZoneId || zoneId;
        try {
            const data = await cfFetch(`/zones/${resolvedZoneId}/dns_records?name=${subdomain}.b-2b.com`);
            if (data.result && data.result.length > 0) {
                return { active: true, status: 'active', proxied: data.result[0].proxied };
            }
            return { active: false, status: 'missing' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Trigger a redeployment of the Cloudflare Pages project (main account only)
     */
    const triggerRedeployment = async () => {
        try {
            if (!accountId || !projectName) {
                return { success: false, error: 'Account ID or Project Name missing' };
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
            return { success: false, error: error.message };
        }
    };

    return {
        testToken,
        getAccountInfo,
        createSubdomain,
        checkDnsRecord,
        checkSSLStatus,
        triggerRedeployment,
    };
};
