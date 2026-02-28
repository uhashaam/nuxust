import { generateIndustryNews as deepseekContent } from './deepseek';
import { generateIndustryNews as doubaoContent } from './doubao';
import { useRuntimeConfig } from '#imports';

export async function generateIndustryNews(industryName: string) {
    const config = useRuntimeConfig();
    // Default to doubao if credentials exist, otherwise fallback to deepseek
    const provider = (config.volcAccessKey && config.volcEndpointId) ? 'doubao' : 'deepseek';

    if (provider === 'doubao') {
        console.log(`Using Doubao for ${industryName}`);
        return await doubaoContent(industryName);
    } else {
        console.log(`Using DeepSeek for ${industryName}`);
        return await deepseekContent(industryName);
    }
}
