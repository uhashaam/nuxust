
import { fetchRecords, createRecord, updateRecord, type LarkBaseRecord } from './lark/base';

// Define User Interface matching Lark Base schema
export interface User extends LarkBaseRecord {
    fields: {
        user_id?: string | number;
        username: string;
        password_hash: string;
        user_type?: 'admin' | 'user' | 'vip1' | 'vip2' | 'vip3' | 'vip4';
        registration_time?: number;
        remaining_posts?: number;
        bound_site_id?: any[];
        user_status?: 'active' | 'inactive' | 'suspended' | 'pending_verification';
        email?: string;
        plan_expires_at?: number;
        renewal_notified_at?: number;
        password_reset_code?: string;
        verification_code?: string;
        code_expires_at?: number;
    }
}

export const userRepository = {
    /**
     * Find a user by email or username
     */
    async findByUsernameOrEmail(identifier: string): Promise<User | null> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableUsers;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        // Search by username OR email
        const filter = `OR(CurrentValue.[username] = "${identifier}", CurrentValue.[email] = "${identifier}")`;

        try {
            const result = await fetchRecords(appToken, tableId, {
                filter: filter,
                page_size: 1
            });

            if (result.records.length > 0) {
                return result.records[0] as User;
            }
            return null;
        } catch (error) {
            return null;
        }
    },

    /**
     * Find a user by email
     */
    async findByEmail(email: string): Promise<User | null> {
        return this.findByUsernameOrEmail(email);
    },

    /**
     * Create a new user
     */
    async createUser(userData: Omit<User['fields'], 'created_at'>): Promise<User> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableUsers;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        const newUserFields = {
            username: userData.username,
            email: userData.email || '',
            password_hash: userData.password_hash,
            user_type: userData.user_type || 'user',
            registration_time: new Date().getTime(),
            remaining_posts: userData.remaining_posts || 0,
            bound_site_id: userData.bound_site_id || []
        };

        try {
            const record = await createRecord(appToken, tableId, newUserFields);
            return record as User;
        } catch (error: any) {
            throw createError({ statusCode: 500, statusMessage: `Failed to create user record: ${error.message || String(error)}` });
        }
    },

    /**
     * Update an existing user
     */
    async updateUser(recordId: string, updates: Partial<User['fields']>): Promise<User> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableUsers;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        try {
            const record = await updateRecord(appToken, tableId, recordId, updates);
            return record as User;
        } catch (error: any) {
            throw createError({ statusCode: 500, statusMessage: `Failed to update user record: ${error.message || String(error)}` });
        }
    }
};
