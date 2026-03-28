import { prisma } from './prisma';

// Keep the same interface for compatibility with the rest of the application
export interface User {
    record_id: string; // Map Prisma ID to record_id
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

// Map Prisma User model to Lark-compatible User object
const mapUser = (pUser: any): User => {
    return {
        record_id: pUser.id,
        fields: {
            user_id: pUser.id,
            username: pUser.username,
            email: pUser.email || undefined,
            password_hash: pUser.password_hash,
            user_type: pUser.user_type as any,
            registration_time: Number(pUser.registration_time),
            remaining_posts: pUser.remaining_posts,
            user_status: pUser.user_status as any,
            plan_expires_at: pUser.plan_expires_at ? Number(pUser.plan_expires_at) : undefined,
            renewal_notified_at: pUser.renewal_notified_at ? Number(pUser.renewal_notified_at) : undefined,
            password_reset_code: pUser.password_reset_code || undefined,
            verification_code: pUser.verification_code || undefined,
            code_expires_at: pUser.code_expires_at ? Number(pUser.code_expires_at) : undefined,
            bound_site_id: pUser.bound_site_id ? pUser.bound_site_id : []
        }
    };
};

export const userRepository = {
    /**
     * Find a user by email or username
     */
    async findByUsernameOrEmail(identifier: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { email: identifier }
                ]
            }
        });
        if (!user) return null;
        return mapUser(user);
    },

    /**
     * Find a user by email
     */
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) return null;
        return mapUser(user);
    },

    /**
     * Create a new user
     */
    async createUser(userData: Omit<User['fields'], 'created_at'>): Promise<User> {
        const user = await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password_hash: userData.password_hash,
                user_type: userData.user_type || 'user',
                registration_time: userData.registration_time || Date.now(),
                remaining_posts: userData.remaining_posts || 0,
                bound_site_id: userData.bound_site_id || []
            }
        });
        return mapUser(user);
    },

    /**
     * Update an existing user
     */
    async updateUser(recordId: string, updates: Partial<User['fields']>): Promise<User> {
        // Map fields to Prisma data
        const data: any = { ...updates };
        if (data.user_id !== undefined) delete data.user_id;

        const user = await prisma.user.update({
            where: { id: recordId },
            data
        });
        return mapUser(user);
    }
};
