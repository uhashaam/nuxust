const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function probeIndustrySites() {
    const appId = process.env.NUXT_LARK_APP_ID;
    const appSecret = process.env.NUXT_LARK_APP_SECRET;
    const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
    const tableId = 'tbllBt3KASVevh0m';

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
    console.log('--- Industry Sites Fields ---');
    console.log(JSON.stringify(data.data.items.map(f => ({ name: f.field_name, type: f.type })), null, 2));

    const recordsRes = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
        headers: {
            'Authorization': `Bearer ${tenant_access_token}`
        }
    });
    const recordsData = await recordsRes.json();
    console.log('--- Sample Records ---');
    console.log(JSON.stringify(recordsData.data.items.slice(0, 5).map(r => r.fields), null, 2));
}

probeIndustrySites().catch(console.error);
