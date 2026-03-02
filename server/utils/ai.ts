import { generateDeepSeekNews } from './deepseek';
import { generateDoubaoNews } from './doubao';
import { useRuntimeConfig } from '#imports';

export async function generateIndustryNews(industryName: string) {
    const config = useRuntimeConfig();
    // Default to doubao if credentials exist, otherwise fallback to deepseek
    const provider = (config.volcAccessKey && config.volcEndpointId) ? 'doubao' : 'deepseek';

    if (provider === 'doubao') {
        return await generateDoubaoNews(industryName);
    } else {
        return await generateDeepSeekNews(industryName);
    }
}
