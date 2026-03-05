const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';

async function listTables() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables`;
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.code !== 0) {
            console.error('Lark API error:', data);
            return;
        }

        const tables = data.data.items || [];
        console.log(`Found ${tables.length} tables:`);
        tables.forEach(t => {
            console.log(`- ${t.name} (ID: ${t.table_id})`);
        });

    } catch (e) {
        console.error('Error:', e.message);
    }
}

listTables();
