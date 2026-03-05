const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content table

async function getRecords() {
    try {
        console.log('Fetching access token...');
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        if (!token) {
            console.error('Failed to get token:', tokenData);
            return;
        }

        console.log('Fetching records from table:', tableId);
        const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?page_size=20`;
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.code !== 0) {
            console.error('Lark API error:', data);
            return;
        }

        const records = data.data.items || [];
        console.log(`Found ${records.length} records.`);

        records.forEach((r, i) => {
            console.log(`Record ${i + 1}:`, {
                id: r.record_id,
                title: r.fields.news_title,
                method: r.fields.generation_method,
                status: r.fields.release_status
            });
        });

    } catch (e) {
        console.error('Error:', e.message);
    }
}

getRecords();
