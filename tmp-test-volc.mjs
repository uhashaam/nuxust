
import { Ark } from '@volcengine/ark';
import dotenv from 'dotenv';
dotenv.config();

const ak = process.env.VOLC_ACCESS_KEY;
const sk = process.env.VOLC_SECRET_KEY;

async function listEndpoints() {
    console.log('Listing Volcengine Ark Endpoints...');
    console.log('AK:', ak);

    const ark = new Ark({
        apiKey: ak + ':' + sk, // Ark SDK sometimes uses this format if not using standard API Key, but wait...
        // Actually, the Ark SDK uses a specific Ark API Key. 
        // If we have AK/SK, we usually use the generic Volcengine SDK to generate a token or use the specific service.
    });

    try {
        // Let's try to just call a chat completion if we had an ID.
        // Since we don't, let's try to use the OpenAPI SDK to list endpoints.
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Alternative: Use the OpenAPI SDK to list Ark endpoints
import { Service } from '@volcengine/openapi';

async function listArkEndpoints() {
    const service = new Service({
        host: 'open.volcengineapi.com',
        serviceName: 'ark',
        region: 'cn-beijing',
        accessKeyId: ak,
        secretAccessKey: sk,
    });

    try {
        const res = await service.fetch('ListEndpoints', {
            method: 'GET',
            query: {
                ProjectName: 'default'
            }
        });
        console.log('Endpoints:', JSON.stringify(res, null, 2));
    } catch (e) {
        console.error('ListEndpoints failed:', e.message);
    }
}

listArkEndpoints();
