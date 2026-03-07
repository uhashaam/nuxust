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

const BATCH_1_INDUSTRIES = [
    { name: 'Laser', subdomain: 'laser', h: 1, f: 1, b: 1, nl: 1 },
    { name: 'LED', subdomain: 'led', h: 2, f: 2, b: 2, nl: 2 },
    { name: 'Swim Suit', subdomain: 'swimsuit', h: 3, f: 3, b: 3, nl: 3 },
    { name: 'Machinery', subdomain: 'machinery', h: 4, f: 4, b: 4, nl: 4 },
    { name: 'Bearings', subdomain: 'bearings', h: 5, f: 5, b: 5, nl: 5 },
    { name: 'Tools', subdomain: 'tools', h: 6, f: 6, b: 1, nl: 1 },
    { name: 'Hardware', subdomain: 'hardware', h: 7, f: 7, b: 2, nl: 2 },
    { name: 'Cosmetics', subdomain: 'cosmetics', h: 8, f: 8, b: 3, nl: 3 },
    { name: 'Beauty', subdomain: 'beauty', h: 9, f: 9, b: 4, nl: 4 },
    { name: 'Game', subdomain: 'game', h: 10, f: 10, b: 5, nl: 5 }
];

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
    if (data.code !== 0) {
        throw new Error(`Failed to get access token: ${data.msg}`);
    }
    return data.tenant_access_token;
}

async function deployBatch1() {
    console.log('🚀 Starting deployment of Industry Batch 1 (10 sites)...\n');

    try {
        const accessToken = await getTenantAccessToken();

        const records = BATCH_1_INDUSTRIES.map(site => ({
            fields: {
                industry_name: site.name,
                subdomain: site.subdomain,
                header_style_id: site.h,
                footer_style_id: site.f,
                banner_style_id: site.b,
                news_list_style_id: site.nl,
                news_detail_style_id: (site.nl % 5) + 1, // Simple variation
                site_status: true,
                ai_news_toggle: true,
                ssl_status: ["Active"]
            }
        }));

        const response = await fetch(
            `https://open.feishu.cn/open-apis/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_TABLE_INDUSTRY_SITES}/records/batch_create`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ records })
            }
        );

        const data = await response.json();
        if (data.code !== 0) {
            throw new Error(`Batch creation failed: ${data.msg}`);
        }

        console.log(`✅ Successfully deployed ${data.data.records.length} industry sites!`);
        data.data.records.forEach((r, i) => {
            console.log(`   - ${BATCH_1_INDUSTRIES[i].name} (${BATCH_1_INDUSTRIES[i].subdomain}.b-2b.com)`);
        });

    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

deployBatch1();
