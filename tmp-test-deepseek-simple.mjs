import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.DEEPSEEK_API_KEY;

async function testDeepSeek() {
    console.log('Testing DeepSeek AI Availability...');
    console.log('API Key present:', !!apiKey);

    if (!apiKey) {
        console.error('❌ API Key is missing!');
        return;
    }

    try {
        const response = await axios.post('https://api.deepseek.com/chat/completions', {
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: 'Ping' }
            ],
            temperature: 0.7,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            timeout: 10000
        });

        console.log('✅ Success! DeepSeek is available.');
        console.log('Response:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('❌ Failed to connect to DeepSeek:', error.response?.data || error.message);
    }
}

testDeepSeek();
