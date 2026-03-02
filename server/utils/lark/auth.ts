/**
 * Get tenant access token for API calls using native fetch (Cloudflare compatible)
 */
export async function getTenantAccessToken(): Promise<string> {
  const config = useRuntimeConfig()
  const appId = config.larkAppId || config.feishuAppId
  const appSecret = config.larkAppSecret || config.public.feishuAppSecret

  if (!appId || !appSecret) {
    throw new Error('Lark App ID and App Secret must be configured in environment variables')
  }

  try {
    const response = await $fetch<any>('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      body: {
        app_id: appId,
        app_secret: appSecret,
      },
    })

    if (!response.tenant_access_token) {
      throw new Error(`Failed to obtain tenant access token: ${response.msg || 'Unknown error'}`)
    }

    return response.tenant_access_token
  } catch (error: any) {
    throw new Error(`Lark authentication failed: ${error.message}`)
  }
}
