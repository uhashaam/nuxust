const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function probeNewsContent() {
    const appId = process.env.NUXT_LARK_APP_ID;
    const appSecret = process.env.NUXT_LARK_APP_SECRET;
    const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
    const tableId = 'tblnA57O1m70HSY7'; // News Content table

    const tokenRes = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_id: appId, app_secret: appSecret })
    });
    const { tenant_access_token } = await tokenRes.json();

    const res = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
        headers: {
            'Authorization': `Bearer ${tenant_access_token}`
        }
    });

    const data = await res.json();
    console.log('--- News Content Fields ---');
    console.log(JSON.stringify(data.data.items.map(f => ({ name: f.field_name, type: f.type })), null, 2));
}

probeNewsContent().catch(console.error);
