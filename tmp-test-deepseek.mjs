
import { generateIndustryNews } from './server/utils/deepseek.ts';
import dotenv from 'dotenv';
dotenv.config();

// Manually set the expected env var for the utility if the typo exists
process.env.DEEPSEEK_API_KEY = process.env['D E E P S E E K _ A P I _ K E Y ']?.replace(/\s/g, '');

async function testDeepSeek() {
    console.log('Testing DeepSeek AI Availability...');
    try {
        const result = await generateIndustryNews('Laser Welder');
        console.log('✅ Success! DeepSeek is available.');
        console.log('Title:', result.title);
        console.log('Content Length:', result.content.length);
    } catch (error) {
        console.error('❌ Failed to connect to DeepSeek:', error.message);
    }
}

testDeepSeek();
