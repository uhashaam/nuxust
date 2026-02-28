const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';

async function listTables() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTable.list({
            path: { app_token: appToken }
        });
        if (res.code === 0) {
            console.log('--- Tables in Base ---');
            res.data.items.forEach(t => console.log(`- ${t.name} (ID: ${t.table_id})`));
        } else {
            console.error('Error listing tables:', res.msg);
        }
    } catch (e) {
        console.error('List tables failed:', e.message);
    }
}

listTables();
