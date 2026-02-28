import { useRuntimeConfig } from '#imports';

export async function generateIndustryNews(industryName: string): Promise<{ title: string; content: string; isSafe: boolean }> {
    const config = useRuntimeConfig();
    const apiKey = config.deepseekApiKey;

    if (!apiKey) {
        throw new Error('DeepSeek API Key is missing in environment variables');
    }

    const prompt = `You are a professional industry news editor. Write an original and highly professional news article about the "${industryName}" industry. 
    
    Requirements:
    1. The article must be between 500 and 800 words, highly relevant to the ${industryName} industry (market trends, technological innovations, product updates).
    2. 100% original content (Originality must exceed 95%). Do not copy existing articles. Provide deep insights.
    3. The content must use valid HTML tags (<h2>, <p>, <ul>, <li>, etc.) suitable for rendering directly in a CMS. DO NOT include the <h1> tag in the content, just the body. NO markdown block syntax.
    4. Content Review: Check for prohibited content (pornography, illegal material, political sensitivity, or false information).
    
    Return strict JSON with the following structure:
    {
      "title": "A clear, engaging headline",
      "content": "The HTML formatted article body",
      "isSafe": true (set to false if any prohibited content or safety concerns are detected)
    }`;

    try {
        const response = await $fetch<any>('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: {
                model: 'deepseek-chat',
                response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: 'You are an expert industry news journalist. You only output strictly valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
            },
            timeout: 120000
        });

        const resultText = response.choices?.[0]?.message?.content || '{}';
        const parsed = JSON.parse(resultText);

        return {
            title: parsed.title || `${industryName} Industry Update`,
            content: parsed.content || '',
            isSafe: parsed.isSafe ?? true
        };

    } catch (error: any) {
        throw new Error('Failed to generate AI news: ' + (error?.data?.error?.message || error.message));
    }
}
