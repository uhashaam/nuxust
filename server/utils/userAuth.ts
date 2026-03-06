import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getJwtSecret(): string {
    const config = useRuntimeConfig();
    const secret = config.jwtSecret || process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not configured');
    }
    return secret;
}

// ── Minimal HS256 JWT using Web Crypto API (Edge-compatible) ──────────────────

function base64urlEncode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str: string): Uint8Array {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + (4 - str.length % 4) % 4, '=');
    return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}

async function importKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

export const userAuth = {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    },

    async generateToken(payload: Record<string, any>): Promise<string> {
        const secret = getJwtSecret();
        const header = { alg: 'HS256', typ: 'JWT' };
        const now = Math.floor(Date.now() / 1000);
        const claims = { ...payload, iat: now, exp: now + JWT_EXPIRES_IN_SECONDS };

        const headerB64 = base64urlEncode(new TextEncoder().encode(JSON.stringify(header)));
        const payloadB64 = base64urlEncode(new TextEncoder().encode(JSON.stringify(claims)));
        const signingInput = `${headerB64}.${payloadB64}`;

        const key = await importKey(secret);
        const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));

        return `${signingInput}.${base64urlEncode(signature)}`;
    },

    async verifyToken(token: string): Promise<Record<string, any> | null> {
        try {
            const secret = getJwtSecret();
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const [headerB64, payloadB64, sigB64] = parts;
            const signingInput = `${headerB64}.${payloadB64}`;

            const key = await importKey(secret);
            const valid = await crypto.subtle.verify(
                'HMAC', key,
                base64urlDecode(sigB64),
                new TextEncoder().encode(signingInput)
            );
            if (!valid) return null;

            const claims = JSON.parse(new TextDecoder().decode(base64urlDecode(payloadB64)));
            if (claims.exp && claims.exp < Math.floor(Date.now() / 1000)) return null;

            return claims;
        } catch {
            return null;
        }
    }
};
