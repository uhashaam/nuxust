const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const plansTableId = 'tblFDfcvNDMfRH9X';

async function probe() {
    const client = new lark.Client({ appId, appSecret });

    console.log(`\n=== PROBING Plans TABLE (${plansTableId}) ===`);
    try {
        // Fields list
        const fieldsRes = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: plansTableId }
        });
        console.log('--- Fields from API ---');
        if (fieldsRes.code === 0) {
            fieldsRes.data.items.forEach(f => console.log(`- ${f.field_name} (Type: ${f.type}, ID: ${f.field_id})`));
        }

        // Actual record
        const recordsRes = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: plansTableId },
            params: { page_size: 1 }
        });
        console.log('--- Sample Record Data ---');
        if (recordsRes.code === 0 && recordsRes.data.items.length > 0) {
            console.log(JSON.stringify(recordsRes.data.items[0].fields, null, 2));
        } else {
            console.log('No records found or error');
        }
    } catch (e) {
        console.error('Plans probe failed:', e.message);
    }
}

probe();
