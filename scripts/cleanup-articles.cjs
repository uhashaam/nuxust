const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function cleanupAll() {
    const client = new lark.Client({ appId, appSecret });
    try {
        let allItems = [];
        let pageToken = undefined;
        let hasMore = true;

        while (hasMore) {
            const res = await client.bitable.appTableRecord.list({
                path: { app_token: appToken, table_id: tableId },
                params: { page_size: 100, page_token: pageToken }
            });

            if (res.code !== 0) {
                console.error(`Lark Error: ${res.code} - ${res.msg}`);
                return;
            }

            if (res.data.items) {
                allItems = allItems.concat(res.data.items);
            }

            hasMore = res.data.has_more;
            pageToken = res.data.page_token;
        }

        console.log(`Total articles fetched: ${allItems.length}\n`);

        const toDeleteIds = [];
        const seenTitles = new Set();
        let deletedCount = 0;

        for (const f of allItems) {
            const id = f.record_id;
            const title = f.fields.news_title || 'Untitled';
            const content = f.fields.news_content || '';
            const images = f.fields.featured_image || [];

            let shouldDelete = false;
            let reason = '';

            if (title === 'Untitled' || content.length < 500) {
                shouldDelete = true;
                reason = 'Too short / Untitled';
            } else if (images.length === 0) {
                shouldDelete = true;
                reason = 'No image';
            } else if (images.some(img => img.size < 1000)) {
                shouldDelete = true;
                reason = 'Broken image';
            } else if (seenTitles.has(title)) {
                shouldDelete = true;
                reason = 'Duplicate title';
            }

            if (shouldDelete) {
                console.log(`Deleting [${reason}]: ${title}`);
                toDeleteIds.push(id);
            } else {
                seenTitles.add(title);
            }
        }

        // Batch delete
        if (toDeleteIds.length > 0) {
            console.log(`Deleting ${toDeleteIds.length} records...`);
            // Split into chunks of 100 (API limit)
            for (let i = 0; i < toDeleteIds.length; i += 100) {
                const chunk = toDeleteIds.slice(i, i + 100);
                const delRes = await client.bitable.appTableRecord.batchDelete({
                    path: { app_token: appToken, table_id: tableId },
                    data: { records: chunk }
                });
                if (delRes.code !== 0) {
                    console.error(`Delete Error: ${delRes.msg}`);
                } else {
                    console.log(`Deleted chunk of ${chunk.length}`);
                }
            }
        } else {
            console.log('No records to delete.');
        }

    } catch (e) {
        console.error(e);
    }
}

cleanupAll();
