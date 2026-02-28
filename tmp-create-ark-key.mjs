
import { Service } from '@volcengine/openapi';
import dotenv from 'dotenv';
dotenv.config();

const ak = process.env.VOLC_ACCESS_KEY;
const sk = process.env.VOLC_SECRET_KEY;

async function createArkApiKey() {
    console.log('Attempting to create Ark API Key using AK/SK...');

    const service = new Service({
        host: 'ark.volcengineapi.com',
        serviceName: 'ark',
        region: 'cn-beijing',
        accessKeyId: ak,
        secretAccessKey: sk,
    });

    try {
        const res = await service.fetch('CreateApiKey', {
            method: 'POST',
            body: {
                DurationSeconds: 3600 * 24 * 30 // 30 days
            }
        });
        console.log('Result:', JSON.stringify(res, null, 2));
    } catch (e) {
        console.error('CreateApiKey failed:', e.message);
    }
}

createArkApiKey();
