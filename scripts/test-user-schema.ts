
import { larkClient } from '../server/utils/lark/auth';

const TABLE_ID = process.env.LARK_TABLE_USERS;
const APP_TOKEN = process.env.LARK_BASE_APP_TOKEN;

if (!TABLE_ID || !APP_TOKEN) {
    console.error('Missing Lark Base configuration');
    process.exit(1);
}

async function testUserSchema() {
    console.log('Testing User Table Schema...');

    // Define the fields we expect to be present
    const testUser = {
        fields: {
            "username": "test_sys_admin",
            "email": "admin@b-2b.com",
            "password_hash": "hashed_secret_123", // In real app this will be bcrypt hash
            "role": "admin",
            "status": "active",
            "created_at": new Date().getTime(),
            "plan_id": "plan_free_tier"
        }
    };

    try {
        const response = await larkClient.bitable.appTableRecord.create({
            path: {
                app_token: APP_TOKEN,
                table_id: TABLE_ID,
            },
            data: testUser
        });

        if (response.code === 0) {
            console.log('✅ Successfully created test user record!');
            console.log('Record ID:', response.data.record.record_id);
        } else {
            console.error('❌ Failed to create record:', response.msg);
            console.error('Error details:', response);
        }
    } catch (err) {
        console.error('❌ Exception during schema test:', err);
    }
}

testUserSchema();
