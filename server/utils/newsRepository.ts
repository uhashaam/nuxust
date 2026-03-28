import { prisma } from './prisma';
import fs from 'fs';
import path from 'path';

export interface News {
    record_id: string;
    fields: {
        news_id?: string;
        site_id: any[]; // Link field
        news_title: string;
        news_content: string;
        generation_method: 'Manual' | 'AI';
        release_time: number;
        release_status: 'Published' | 'Draft' | 'Trending';
        featured_image?: string | any[];
        author_email?: string;
    }
}

const mapNews = (pNews: any): News => {
    return {
        record_id: pNews.id,
        fields: {
            news_id: pNews.id,
            news_title: pNews.title,
            news_content: pNews.content,
            generation_method: pNews.generation_method || 'Manual',
            release_time: pNews.publication_time ? Number(pNews.publication_time) : Date.now(),
            release_status: pNews.status as any,
            author_email: pNews.author || undefined,
            site_id: pNews.industry ? [{ record_id: pNews.industry }] : [],
            featured_image: pNews.thumbnail
        }
    };
};

export const newsRepository = {
    async getNewsBySite(siteRecordId: string): Promise<News[]> {
        const news = await prisma.newsContent.findMany({
            where: { industry: siteRecordId }
        });
        return news.map(mapNews);
    },

    async getNewsByAuthor(email: string): Promise<News[]> {
        const news = await prisma.newsContent.findMany({
            where: { author: email }
        });
        return news.map(mapNews);
    },

    async getAllNews(): Promise<News[]> {
        const news = await prisma.newsContent.findMany();
        return news.map(mapNews);
    },

    async createNews(newsData: any): Promise<News> {
        let featured_image: any = null;

        if (newsData.featured_image) {
            const img = newsData.featured_image;
            if (typeof img === 'string' && img.startsWith('data:image')) {
                // Save base64 image locally
                try {
                    const match = img.match(/^data:([^;]+);base64,(.+)$/);
                    if (match && match.length === 3 && match[1] && match[2]) {
                        const contentType = match[1] as string;
                        const base64Data = match[2] as string;
                        const buffer = Buffer.from(base64Data, 'base64');
                        const ext = contentType.split('/')[1] || 'jpg';
                        const fileName = `news_image_${Date.now()}.${ext}`;
                        
                        // Ensure uploads folder exists
                        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir, { recursive: true });
                        }
                        
                        fs.writeFileSync(path.join(uploadDir, fileName), buffer);
                        featured_image = [{ url: `/uploads/${fileName}` }];
                    }
                } catch (e) {
                    console.error('Failed saving local image in prisma:', e);
                }
            } else if (typeof img === 'string') {
                featured_image = [{ url: img }];
            } else {
                featured_image = img;
            }
        }

        const siteIdVal = Array.isArray(newsData.site_id) && newsData.site_id.length > 0
            ? (newsData.site_id[0].record_id || newsData.site_id[0])
            : null;

        const pNews = await prisma.newsContent.create({
            data: {
                title: newsData.news_title,
                content: newsData.news_content,
                industry: siteIdVal,
                publication_time: newsData.release_time || Date.now(),
                status: newsData.release_status || 'Published',
                author: newsData.author_email,
                thumbnail: featured_image,
                slug: newsData.news_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now()
            }
        });

        return mapNews(pNews);
    },

    async updateNews(recordId: string, updates: Partial<News['fields']>): Promise<News> {
        const data: any = {};
        if (updates.news_title) data.title = updates.news_title;
        if (updates.news_content) data.content = updates.news_content;
        if (updates.release_status) data.status = updates.release_status;
        if (updates.release_time) data.publication_time = updates.release_time;
        if (updates.author_email) data.author = updates.author_email;
        if (updates.site_id && updates.site_id.length > 0) {
            data.industry = updates.site_id[0].record_id || updates.site_id[0];
        }
        
        const pNews = await prisma.newsContent.update({
            where: { id: recordId },
            data
        });
        return mapNews(pNews);
    },

    async deleteNews(recordId: string): Promise<boolean> {
        await prisma.newsContent.delete({
            where: { id: recordId }
        });
        return true;
    }
};
