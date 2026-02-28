const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const siteTableId = 'tbllBt3KASVevh0m';

async function mapSites() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: siteTableId }
        });
        console.log('--- Site Mappings ---');
        res.data.items.forEach(i => {
            console.log(`Subdomain: ${i.fields.subdomain} -> Record ID: ${i.record_id}`);
        });
    } catch (e) {
        console.error(e);
    }
}

mapSites();
