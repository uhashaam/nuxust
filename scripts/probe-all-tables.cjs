const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';

async function probeAll() {
    const client = new lark.Client({ appId, appSecret });

    try {
        console.log('--- Listing All Tables ---');
        const res = await client.bitable.appTable.list({
            path: { app_token: appToken }
        });

        if (res.code === 0) {
            for (const table of res.data.items) {
                console.log(`Table: ${table.name} (ID: ${table.table_id})`);

                // Get fields for each table to identify which one is for products
                const fieldsRes = await client.bitable.appTableField.list({
                    path: { app_token: appToken, table_id: table.table_id }
                });
                if (fieldsRes.code === 0) {
                    const fieldNames = fieldsRes.data.items.map(f => f.field_name);
                    console.log(`  Fields: ${fieldNames.join(', ')}`);
                }
                console.log('---------------------------');
            }
        } else {
            console.error('Failed to list tables:', res.msg);
        }
    } catch (e) {
        console.error('Probe failed:', e);
    }
}

probeAll();
