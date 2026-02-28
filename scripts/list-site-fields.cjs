const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const siteTableId = 'tbllBt3KASVevh0m';

async function listFields() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: siteTableId }
        });
        console.log('--- Industry Sites Fields ---');
        res.data.items.forEach(f => {
            console.log(`Field: ${f.field_name} (Type: ${f.type})`);
        });
    } catch (e) {
        console.error(e);
    }
}

listFields();
