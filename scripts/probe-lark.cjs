const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const userTableId = 'tblDEuGA5JSsChgi';
const newsTableId = 'tblnA57O1m70HSY7';

async function probe() {
    const client = new lark.Client({ appId, appSecret });

    const tables = { 'Users': userTableId, 'News': newsTableId };

    for (const [name, id] of Object.entries(tables)) {
        console.log(`\n=== PROBING ${name} TABLE (${id}) ===`);
        try {
            // Fields list
            const fieldsRes = await client.bitable.appTableField.list({
                path: { app_token: appToken, table_id: id }
            });
            console.log('--- Fields from API ---');
            if (fieldsRes.code === 0) {
                fieldsRes.data.items.forEach(f => console.log(`- ${f.field_name} (Type: ${f.type})`));
            }

            // Actual record
            const recordsRes = await client.bitable.appTableRecord.list({
                path: { app_token: appToken, table_id: id },
                params: { page_size: 1 }
            });
            console.log('--- Sample Record Data ---');
            if (recordsRes.code === 0 && recordsRes.data.items.length > 0) {
                console.log(JSON.stringify(recordsRes.data.items[0].fields, null, 2));
            } else {
                console.log('No records found or error');
            }
        } catch (e) {
            console.error(`${name} probe failed:`, e.message);
        }
    }
}

probe();
