
import fetch from 'node-fetch';

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tbl7BO74pxCEbtvL';

async function main() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        const res = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        console.log('FIELDS:', JSON.stringify(data.data.items, null, 2));

        const recordsRes = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?page_size=5`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const recordsData = await recordsRes.json();
        console.log('RECORDS:', JSON.stringify(recordsData.data?.items, null, 2));

    } catch (e) {
        console.error(e);
    }
}

main();
