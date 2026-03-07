const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function addMissingFields() {
    const tenantTokenRes = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            app_id: process.env.NUXT_LARK_APP_ID,
            app_secret: process.env.NUXT_LARK_APP_SECRET
        })
    });
    const { tenant_access_token } = await tenantTokenRes.json();
    const appToken = process.env.NUXT_LARK_BASE_APP_TOKEN;
    const tableId = process.env.NUXT_LARK_TABLE_USERS;

    const fieldsToAdd = [
        { field_name: 'user_status', type: 1 },         // Text
        { field_name: 'plan_expires_at', type: 5 },     // DateTime
        { field_name: 'renewal_notified_at', type: 5 }, // DateTime
        { field_name: 'password_reset_code', type: 1 }, // Text
        { field_name: 'verification_code', type: 1 },   // Text
        { field_name: 'code_expires_at', type: 5 }      // DateTime
    ];

    for (const field of fieldsToAdd) {
        console.log(`Adding field: ${field.field_name}...`);
        const res = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tenant_access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        });
        const data = await res.json();
        if (data.code === 0) {
            console.log(`✅ Success adding ${field.field_name}`);
        } else {
            console.error(`❌ Failed to add ${field.field_name}: ${data.msg}`);
        }
    }
}

addMissingFields().catch(console.error);
