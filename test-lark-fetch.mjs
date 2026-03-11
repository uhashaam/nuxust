import fs from 'fs';
import dotenv from 'dotenv';

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const LARK_APP_ID = process.env.NUXT_LARK_APP_ID;
const LARK_APP_SECRET = process.env.NUXT_LARK_APP_SECRET;
const LARK_BASE_APP_TOKEN = process.env.NUXT_LARK_BASE_APP_TOKEN || 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const LARK_TABLE_INDUSTRY_SITES = process.env.NUXT_PUBLIC_LARK_TABLE_IDS_INDUSTRYSITES || 'tbllBt3KASVevh0m';

async function getTenantAccessToken() {
    const response = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
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

async function fetchRecords(appToken, tableId, pageToken) {
    const token = await getTenantAccessToken();
    const query = new URLSearchParams({ page_size: '100' });
    if (pageToken) query.append('page_token', pageToken);

    console.log(`Fetching with page_token: ${pageToken}`);
    const res = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?${query.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    return await res.json();
}

async function testFetch() {
    let hasMore = true;
    let pageToken = undefined;
    let allRecords = [];

    while (hasMore) {
        const data = await fetchRecords(LARK_BASE_APP_TOKEN, LARK_TABLE_INDUSTRY_SITES, pageToken);
        if (data.code !== 0) {
            console.error("Error fetching:", data);
            break;
        }
        const items = data.data.items || [];
        allRecords.push(...items);
        hasMore = data.data.has_more;
        pageToken = data.data.page_token;
        console.log(`Fetched ${items.length} items. hasMore: ${hasMore}, next pageToken: ${pageToken}`);

        if (hasMore && !pageToken) {
            console.warn("Infinite loop detected!");
            break;
        }
    }

    console.log(`Total records: ${allRecords.length}`);
    const valveRecord = allRecords.find(r => r.fields.subdomain === 'valves');
    console.log("Valves record:", valveRecord ? "Found" : "Not Found");
}

testFetch();
