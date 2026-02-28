const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const sitesTableId = 'tbllBt3KASVevh0m';

async function listSites() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: sitesTableId }
        });

        console.log(JSON.stringify(res.data.items.map(s => ({
            id: s.record_id,
            name: s.fields.industry_name,
            subdomain: s.fields.subdomain
        })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

listSites();
