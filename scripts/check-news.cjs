const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const newsTableId = 'tblnA57O1m70HSY7';
const targetSiteId = 'recvbsCIC13p0f'; // laserwelder

async function checkLaserWelderNews() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: newsTableId }
        });

        const filtered = res.data.items.filter(n => {
            const siteField = n.fields.site_id || [];
            return siteField.some(s => {
                if (typeof s === 'string') return s === targetSiteId;
                if (s && s.record_id === targetSiteId) return true;
                if (s && s.record_ids && s.record_ids.includes(targetSiteId)) return true;
                return false;
            });
        });

        console.log(`Found ${filtered.length} posts for laserwelder`);
        filtered.forEach(f => {
            console.log(`- Title: ${f.fields.news_title}, Time: ${f.fields.release_time}`);
        });
    } catch (e) { console.error(e); }
}

checkLaserWelderNews();
