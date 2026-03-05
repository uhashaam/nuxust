const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblDEuGA5JSsChgi'; // User Management table

async function getUsers() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`;
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.code !== 0) {
            console.error('Lark API error:', data);
            return;
        }

        const records = data.data.items || [];
        console.log(`Found ${records.length} users:`);
        records.forEach(r => {
            console.log(`- ${r.fields.username} (${r.fields.email}) [Type: ${r.fields.user_type}]`);
        });

    } catch (e) {
        console.error('Error:', e.message);
    }
}

getUsers();
