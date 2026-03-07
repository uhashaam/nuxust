const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function probeUsers() {
    console.log("Fetching tenant token...");
    const tenantTokenRes = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            app_id: process.env.NUXT_LARK_APP_ID,
            app_secret: process.env.NUXT_LARK_APP_SECRET
        })
    });

    if (!tenantTokenRes.ok) {
        throw new Error('Tenant token failed: ' + await tenantTokenRes.text());
    }
    const { tenant_access_token } = await tenantTokenRes.json();
    console.log("Token:", !!tenant_access_token);

    const appToken = process.env.NUXT_LARK_BASE_APP_TOKEN;
    const tableId = process.env.NUXT_LARK_TABLE_USERS;

    console.log("App:", appToken, "Table:", tableId);

    const res = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
        headers: {
            'Authorization': `Bearer ${tenant_access_token}`
        }
    });

    const data = await res.json();
    if (data.code !== 0) {
        console.error("Lark API Error:", JSON.stringify(data, null, 2));
        return;
    }
    console.log(JSON.stringify(data.data.items.map(f => ({ name: f.field_name, type: f.type })), null, 2));
}

probeUsers().catch(console.error);
