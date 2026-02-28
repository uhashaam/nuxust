import * as lark from '@larksuiteoapi/node-sdk'

let client: lark.Client | null = null

/**
 * Get or initialize the Lark client singleton
 */
export function getLarkClient(): lark.Client {
  if (client) {
    return client
  }

  const config = useRuntimeConfig()
  const appId = config.larkAppId || config.public.feishuAppId
  const appSecret = config.larkAppSecret || config.public.feishuAppSecret

  if (!appId || !appSecret) {
    throw new Error('Lark App ID and App Secret must be configured in environment variables')
  }

  client = new lark.Client({
    appId,
    appSecret,
    appType: lark.AppType.SelfBuild,
    domain: lark.Domain.Feishu,
  })

  return client
}

/**
 * Get tenant access token for API calls
 */
export async function getTenantAccessToken(): Promise<string> {
  const client = getLarkClient()

  try {
    const response = await client.auth.tenantAccessToken.internal({
      data: {
        app_id: client.appId,
        app_secret: client.appSecret,
      },
    })

    if (!response.tenant_access_token) {
      throw new Error('Failed to obtain tenant access token')
    }

    return response.tenant_access_token
  } catch (error) {
    throw new Error('Lark authentication failed')
  }
}
