
const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tbl7BO74pxCEbtvL';

async function setupTable() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;
        if (!token) throw new Error('Failed to get tenant access token');

        // Get existing fields
        const fieldsRes = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const fieldsData = await fieldsRes.json();
        const existingFields = fieldsData.data.items || [];
        const existingNames = existingFields.map(f => f.field_name);

        console.log('Existing fields:', existingNames);

        // Rename primary field if it's "Text"
        const primaryField = existingFields.find(f => f.is_primary);
        if (primaryField && (primaryField.field_name === 'Text' || primaryField.field_name === 'text')) {
            console.log('Renaming primary field to "name"...');
            const renameRes = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields/${primaryField.field_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ field_name: 'name' })
            });
            const text = await renameRes.text();
            console.log('Rename response RAW:', text);
        }

        const fieldsToCreate = [
            { field_name: 'description', type: 1 },
            { field_name: 'short_description', type: 1 },
            { field_name: 'price', type: 2 },
            { field_name: 'category', type: 1 },
            { field_name: 'specifications', type: 1 },
            { field_name: 'slug', type: 1 },
            { field_name: 'featured_image', type: 17 },
            { field_name: 'is_featured', type: 7 }
        ];

        for (const field of fieldsToCreate) {
            if (!existingNames.includes(field.field_name)) {
                console.log(`Creating field: ${field.field_name}...`);
                const res = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(field)
                });
                const resText = await res.text();
                console.log(`Response for ${field.field_name} RAW:`, resText);
            }
        }

        console.log('Table setup complete.');

    } catch (e) {
        console.error('ERROR:', e.message);
    }
}

setupTable();
