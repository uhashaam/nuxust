const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function listFields() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: tableId }
        });

        console.log(JSON.stringify(res.data.items.map(f => ({
            name: f.field_name,
            type: f.type
        })), null, 2));
    } catch (e) { console.error(e); }
}

listFields();
