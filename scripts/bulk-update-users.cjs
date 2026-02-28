const lark = require('@larksuiteoapi/node-sdk');

// Configuration from environment or hardcoded as per project pattern
const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const usersTableId = 'tblDEuGA5JSsChgi'; // Verified ID

// Quota mapping (28-day supply)
const QUOTA_MAP = {
    'VIP1': 4,
    'VIP2': 28,
    'VIP3': 56,
    'VIP4': 84,
    'Admin': 9999,
    'User': 0,
    'admin': 9999,
    'vip1': 4,
    'vip2': 28,
    'vip3': 56,
    'vip4': 84,
    'user': 0
};

async function bulkUpdateUsers() {
    console.log('--- Starting Bulk Update of User Quotas ---');
    const client = new lark.Client({ appId, appSecret });

    try {
        // 1. Fetch all users
        let allRecords = [];
        let pageToken = '';

        do {
            const resp = await client.bitable.appTableRecord.list({
                path: { app_token: appToken, table_id: usersTableId },
                params: { page_token: pageToken, page_size: 100 }
            });

            if (resp.code === 0 && resp.data.items) {
                allRecords = allRecords.concat(resp.data.items);
                pageToken = resp.data.page_token;
            } else {
                console.error('Failed to list users or no items:', resp.msg);
                break;
            }
        } while (pageToken);

        console.log(`Found ${allRecords.length} users. Processing...`);

        // 2. Update each user based on their type
        for (const record of allRecords) {
            const userId = record.record_id;
            const userType = record.fields.user_type || 'User';
            const username = record.fields.username;

            const newQuota = QUOTA_MAP[userType] !== undefined ? QUOTA_MAP[userType] : 0;

            console.log(`Updating ${username} (${userType}) -> ${newQuota} posts`);

            await client.bitable.appTableRecord.update({
                path: { app_token: appToken, table_id: usersTableId, record_id: userId },
                data: {
                    fields: {
                        remaining_posts: newQuota
                    }
                }
            });
        }

        console.log('--- Bulk update completed successfully ---');
    } catch (e) {
        console.error('Error during bulk update:', e);
    }
}

// Warning: Run this only when you want to reset ALL users to their base quota.
bulkUpdateUsers();

console.log('Script loaded. Uncomment the bulkUpdateUsers() call to execute.');
