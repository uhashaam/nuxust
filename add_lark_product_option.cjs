const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content table
const fieldId = 'generation_method';

async function addProductOption() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        // First get current field details to get the correct field_id (it might be different from name)
        const fieldsUrl = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`;
        const fieldsRes = await fetch(fieldsUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const fieldsData = await fieldsRes.json();
        const field = fieldsData.data.items.find(f => f.field_name === 'generation_method');

        if (!field) {
            console.error('Field generation_method not found');
            return;
        }

        console.log('Found field:', field.field_id);

        const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields/${field.field_id}`;

        // Add 'Product' to options
        const currentOptions = field.property.options || [];
        if (currentOptions.some(o => o.name === 'Product')) {
            console.log('Option Product already exists');
        } else {
            const newOptions = [...currentOptions, { name: 'Product' }];
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    field_name: 'generation_method',
                    type: 3,
                    property: {
                        options: newOptions
                    }
                })
            });
            const data = await res.json();
            console.log('Update result:', data);
        }

    } catch (e) {
        console.error('Error:', e.message);
    }
}

addProductOption();
