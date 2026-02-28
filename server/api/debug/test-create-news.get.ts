import { newsRepository } from '../../utils/newsRepository'

export default defineEventHandler(async (event) => {
    try {
        const testNews = await newsRepository.createNews({
            news_title: 'Debug Test Post ' + new Date().toISOString(),
            news_content: 'This is a test post to debug the 500 error.',
            generation_method: 'Manual',
            site_id: [],
            author_email: 'debug@test.com'
        })

        return {
            success: true,
            news: testNews
        }
    } catch (error: any) {
        try {
            const fs = await import('fs')
            fs.appendFileSync('E:\\nuxt-ssg-project\\error_log.txt', `\n[${new Date().toISOString()}] Test Create Error: ${error.message}\nStack: ${error.stack}\nDetail: ${JSON.stringify(error, null, 2)}\n`)
        } catch (e) { }

        return {
            success: false,
            message: error.message,
            errorDetail: error
        }
    }
})
