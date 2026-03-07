const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content table

async function testNewsUpdate() {
    try {
        console.log('1. Fetching token...');
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const { tenant_access_token: token } = await tokenRes.json();

        if (!token) throw new Error('Failed to get token');

        console.log('2. Fetching a sample record to update...');
        const listRes = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?page_size=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const listData = await listRes.json();
        const records = listData.data?.items || [];

        if (records.length === 0) {
            console.log('No news records found to test update.');
            return;
        }

        const recordToUpdate = records[0];
        console.log(`Will test update on record: ${recordToUpdate.record_id}`);

        // Exact payload simulation from update.post.ts
        const id = recordToUpdate.record_id;
        const bodyContent = {
            id: id,
            title: recordToUpdate.fields.news_title + " (Edited)",
            content: recordToUpdate.fields.news_content,
            release_status: "Published",
            author: recordToUpdate.fields.author_email || 'test@test.com',
            publishedAt: new Date().toISOString()
        };

        const updates = {};
        if (bodyContent.title !== undefined) updates.news_title = bodyContent.title;
        if (bodyContent.content !== undefined) updates.news_content = bodyContent.content;
        if (bodyContent.release_status !== undefined) updates.release_status = bodyContent.release_status;
        if (bodyContent.author !== undefined) updates.author_email = bodyContent.author;
        if (bodyContent.publishedAt !== undefined) updates.release_time = new Date(bodyContent.publishedAt).getTime();

        console.log('3. Sending PUT request to Lark with payload:', JSON.stringify(updates, null, 2));

        const updateUrl = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/${id}`;
        const updateRes = await fetch(updateUrl, {
            method: 'PUT', // We know the SDK updateRecord now uses PUT
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields: updates })
        });

        const updateData = await updateRes.json();
        console.log('\n=== LARK API RESPONSE ===');
        console.log(`Status Code: ${updateData.code}`);
        console.log(`Message: ${updateData.msg}`);

        if (updateData.code !== 0) {
            console.log('Full Error Details:', JSON.stringify(updateData, null, 2));
            if (updateData.error) {
                console.log('Inner Error:', JSON.stringify(updateData.error, null, 2));
            }
        } else {
            console.log('Update SUCCEEDED! The issue is likely elsewhere in the backend pipeline.');
        }

    } catch (e) {
        console.error('Diagnostic Script Failed:', e.message);
    }
}

testNewsUpdate();
