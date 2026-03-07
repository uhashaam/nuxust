import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const LARK_APP_ID = process.env.NUXT_LARK_APP_ID;
const LARK_APP_SECRET = process.env.NUXT_LARK_APP_SECRET;
const LARK_BASE_APP_TOKEN = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const LARK_TABLE_INDUSTRY_SITES = 'tbllBt3KASVevh0m';

const STYLE_MAPPING = {
    'laser': { h: 7, f: 5, b: 1, nd: 2, nl: 5 },
    'led': { h: 7, f: 5, b: 1, nd: 2, nl: 5 },
    'swimsuit': { h: 1, f: 1, b: 3, nd: 5, nl: 1 },
    'machinery': { h: 5, f: 9, b: 2, nd: 3, nl: 4 },
    'bearings': { h: 5, f: 9, b: 2, nd: 3, nl: 4 },
    'tools': { h: 2, f: 2, b: 2, nd: 3, nl: 4 },
    'hardware': { h: 2, f: 9, b: 2, nd: 3, nl: 4 },
    'cosmetics': { h: 1, f: 1, b: 3, nd: 5, nl: 3 },
    'beauty': { h: 1, f: 1, b: 3, nd: 5, nl: 3 },
    'game': { h: 6, f: 4, b: 1, nd: 1, nl: 1 }
};

async function getTenantAccessToken() {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            app_id: LARK_APP_ID,
            app_secret: LARK_APP_SECRET
        })
    });
    const data = await response.json();
    return data.tenant_access_token;
}

async function updateStyles() {
    console.log('🔄 Updating Industry Style Mappings (Batch 1)...');
    try {
        const token = await getTenantAccessToken();

        // 1. Fetch current records
        const res = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_TABLE_INDUSTRY_SITES}/records`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        const records = data.data.items || [];

        const updates = [];
        for (const record of records) {
            const subdomain = record.fields.subdomain;
            if (STYLE_MAPPING[subdomain]) {
                const styles = STYLE_MAPPING[subdomain];
                updates.push({
                    record_id: record.record_id,
                    fields: {
                        header_style_id: styles.h,
                        footer_style_id: styles.f,
                        banner_style_id: styles.b,
                        news_detail_style_id: styles.nd,
                        news_list_style_id: styles.nl
                    }
                });
            }
        }

        if (updates.length === 0) {
            console.log('⚠️ No matching subdomains found for update.');
            return;
        }

        // 2. Batch update
        const updateRes = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_TABLE_INDUSTRY_SITES}/records/batch_update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ records: updates })
        });

        const updateData = await updateRes.json();
        if (updateData.code === 0) {
            console.log(`✅ Successfully updated styles for ${updates.length} industry sites!`);
        } else {
            console.error('❌ Update failed:', updateData.msg);
        }

    } catch (e) {
        console.error('❌ Error:', e.message);
    }
}

updateStyles();
