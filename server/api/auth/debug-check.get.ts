export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const password = query.password as string;
    const username = query.username as string;

    if (!password || !username) {
        return { error: 'Missing username or password query params' };
    }

    try {
        const user = await userRepository.findByUsernameOrEmail(username);
        if (!user) return { error: 'User not found' };

        const hash = user.fields.password_hash;
        const isValid = await userAuth.verifyPassword(password, hash);

        return {
            username,
            hasHash: !!hash,
            hashPreview: hash ? `${hash.substring(0, 10)}...` : 'NONE',
            passwordProvided: password,
            isValid,
            bcryptMethod: 'bcryptjs'
        };
    } catch (e: any) {
        return { error: e.message };
    }
});
