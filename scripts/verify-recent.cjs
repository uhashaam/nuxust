const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function verifyRecent() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: tableId },
            params: { page_size: 10 }
        });

        if (res.code !== 0) {
            console.error(`Lark Error: ${res.code} - ${res.msg}`);
            return;
        }

        const items = res.data.items || [];
        // Sort by release_time manually if param didn't work
        items.sort((a, b) => (b.fields.release_time || 0) - (a.fields.release_time || 0));

        const recent = items.slice(0, 4);
        recent.forEach(f => {
            console.log(`- Title: ${f.fields.news_title}`);
            console.log(`  Image Field: ${JSON.stringify(f.fields.featured_image)}`);
        });
    } catch (e) { console.error(e); }
}

verifyRecent();
