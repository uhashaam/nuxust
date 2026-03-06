const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblM82TYnqNnUTMR'; // Admin Settings table

async function getSettingsFields() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`;
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.code !== 0) {
            console.error('Lark API error:', data);
            return;
        }

        const fields = data.data.items || [];
        console.log(`Found ${fields.length} fields in Admin Settings:`);
        fields.forEach(f => {
            console.log(`- ${f.field_name} (Type: ${f.type})`);
        });

    } catch (e) {
        console.error('Error:', e.message);
    }
}

getSettingsFields();
