
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = '7d';

function getJwtSecret(): string {
    const config = useRuntimeConfig();
    const secret = config.jwtSecret || process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not configured');
    }
    return secret;
}

export const userAuth = {
    /**
     * Hash a plain text password
     */
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },

    /**
     * Verify a password against a hash
     */
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    },

    /**
     * Generate a JWT token for a user
     */
    generateToken(payload: object): string {
        const secret = getJwtSecret();
        return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
    },

    /**
     * Verify a JWT token
     */
    verifyToken(token: string): any {
        try {
            const secret = getJwtSecret();
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
};
