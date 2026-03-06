const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblM82TYnqNnUTMR'; // Admin Settings table

async function testSave() {
    // 1. Get token
    const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_id: appId, app_secret: appSecret })
    });
    const { tenant_access_token: token } = await tokenRes.json();
    console.log('Token obtained:', token ? 'YES' : 'NO');

    // 2. List all existing records
    const listUrl = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`;
    const listRes = await fetch(listUrl, { headers: { 'Authorization': `Bearer ${token}` } });
    const listData = await listRes.json();
    console.log('\n=== EXISTING RECORDS ===');
    const records = listData.data?.items || [];
    records.forEach(r => console.log(`- record_id=${r.record_id}, Key="${r.fields.Key}", Value="${r.fields.Value}"`));

    // 3. Test creating a new record
    console.log('\n=== TESTING CREATE (resend_api_key) ===');
    const existing = records.find(r => r.fields.Key === 'resend_api_key');
    if (existing) {
        // Try update
        const updateUrl = `${listUrl}/${existing.record_id}`;
        const updateRes = await fetch(updateUrl, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { 'Key': 'resend_api_key', 'Value': 're_J47TEHVi_KbPWJxEtjn72CRKpKPZCPNpk' } })
        });
        const updateData = await updateRes.json();
        console.log('UPDATE result code:', updateData.code, 'msg:', updateData.msg || 'OK');
    } else {
        // Try create
        const createRes = await fetch(listUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { 'Key': 'resend_api_key', 'Value': 're_J47TEHVi_KbPWJxEtjn72CRKpKPZCPNpk' } })
        });
        const createData = await createRes.json();
        console.log('CREATE result code:', createData.code, 'msg:', createData.msg || 'OK');
        if (createData.code !== 0) console.log('Full response:', JSON.stringify(createData));
    }

    // 4. Test smtp_host update (simulate what the form does)
    console.log('\n=== TESTING UPDATE smtp_host ===');
    const smtpHost = records.find(r => r.fields.Key === 'smtp_host');
    if (smtpHost) {
        const updateRes = await fetch(`${listUrl}/${smtpHost.record_id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { 'Key': 'smtp_host', 'Value': 'smtp.feishu.cn' } })
        });
        const updateData = await updateRes.json();
        console.log('UPDATE smtp_host result code:', updateData.code, 'msg:', updateData.msg || 'OK');
        if (updateData.code !== 0) console.log('Full response:', JSON.stringify(updateData));
    } else {
        console.log('No smtp_host record found, skipping update test');
    }
}

testSave().catch(console.error);
