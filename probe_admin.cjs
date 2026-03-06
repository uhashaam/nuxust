const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblM82TYnqNnUTMR';

async function probe() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: tableId }
        });
        if (res.code === 0) {
            console.log('FIELDS:');
            res.data.items.forEach(f => console.log(`- ${f.field_name} (${f.type})`));
        } else {
            console.error('Error fetching fields:', res.msg);
        }
    } catch (e) {
        console.error('Probe failed:', e.message);
    }
}
probe();
