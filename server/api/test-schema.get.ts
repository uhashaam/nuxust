
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const client = getLarkClient();
    const tableId = config.public.larkTableIds.users;
    const appToken = config.larkBaseAppToken;

    if (!tableId || !appToken) {
        return {
            success: false,
            message: 'Missing Lark Base configuration'
        };
    }

    // Define the fields we expect to be present
    const testUser = {
        fields: {
            "username": "schema_test_user",
            "email": "test@b-2b.com",
            "password_hash": "hashed_secret_123",
            "role": "admin",
            "status": "active",
            "created_at": new Date().getTime(),
            "plan_id": "plan_free_tier"
        }
    };

    try {
        const response = await client.bitable.appTableRecord.create({
            path: {
                app_token: appToken,
                table_id: tableId,
            },
            data: testUser
        });

        if (response.code === 0) {
            // Clean up the test record
            await client.bitable.appTableRecord.delete({
                path: {
                    app_token: appToken,
                    table_id: tableId,
                    record_id: response.data!.record!.record_id!
                }
            });

            return {
                success: true,
                message: 'Schema validation successful',
                recordId: response.data!.record!.record_id
            };
        } else {
            return {
                success: false,
                message: 'Failed to create record',
                error: response
            };
        }
    } catch (err: any) {
        return {
            success: false,
            message: 'Exception during schema test',
            error: err.message
        };
    }
});
