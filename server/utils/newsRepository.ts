import { fetchAllRecords, createRecord, updateRecord, deleteRecord, type LarkBaseRecord } from './lark/base';

export interface News extends LarkBaseRecord {
    fields: {
        news_id?: string;
        site_id: any[]; // Link field
        news_title: string;
        news_content: string;
        generation_method: 'Manual' | 'AI';
        release_time: number;
        release_status: 'Published' | 'Draft' | 'Trending';
        featured_image?: string;
        author_email?: string;
    }
}

export const newsRepository = {
    /**
     * Fetch news for a specific site
     */
    async getNewsBySite(siteRecordId: string): Promise<News[]> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableNewsContent;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        const news = await fetchAllRecords(appToken, tableId);
        return news.filter(n => {
            const siteField = n.fields.site_id || [];
            return siteField.some((s: any) => {
                const rid = typeof s === 'string' ? s : (s.record_id || s.record_ids?.[0]);
                return rid === siteRecordId;
            });
        }) as News[];
    },

    /**
     * Fetch news by author email
     */
    async getNewsByAuthor(email: string): Promise<News[]> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableNewsContent;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        const news = await fetchAllRecords(appToken, tableId);

        return news.filter(n => n.fields.author_email === email) as News[];
    },

    /**
     * Fetch all news records (administrative)
     */
    async getAllNews(): Promise<News[]> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableNewsContent;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing' });
        }

        const news = await fetchAllRecords(appToken, tableId);
        return news as News[];
    },

    /**
     * Create a new news record
     */
    async createNews(newsData: any): Promise<News> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableNewsContent;

        // Strictly pick only fields that exist in Lark to avoid FieldNameNotFound (like 'slug')
        const fields: Record<string, any> = {
            news_title: newsData.news_title,
            news_content: newsData.news_content,
            generation_method: newsData.generation_method || 'Manual',
            release_time: Date.now(),
            release_status: newsData.release_status || 'Published',
            author_email: newsData.author_email,
            news_style_id: newsData.news_style_id,
            news_list_style_id: newsData.news_list_style_id
        }

        // Handle site_id (Link field)
        if (newsData.site_id && Array.isArray(newsData.site_id) && newsData.site_id.length > 0) {
            fields.site_id = newsData.site_id
        }

        // Handle featured_image (Transitioning from Text to Attachment)
        if (newsData.featured_image) {
            const img = newsData.featured_image;
            
            // If it's a base64 string, upload as attachment
            if (typeof img === 'string' && (img.startsWith('data:image') || img.length > 500)) {
                try {
                    // Extract base64 data and metadata
                    const match = img.match(/^data:([^;]+);base64,(.+)$/);
                    if (match) {
                        const contentType = match[1];
                        const base64Data = match[2];
                        const buffer = Buffer.from(base64Data, 'base64');
                        const ext = contentType.split('/')[1] || 'jpg';
                        
                        const fileToken = await uploadAttachment(appToken, tableId, {
                            fileName: `news_image_${Date.now()}.${ext}`,
                            contentType: contentType,
                            buffer: buffer
                        });
                        
                        fields.featured_image = [{ file_token: fileToken }];
                    } else {
                        // Not a formal base64 data URL but potentially just base64 data
                        // Skip if it looks like garbage to avoid Lark errors
                    }
                } catch (err) {
                    console.error('Failed to upload base64 image to Lark:', err);
                }
            } else if (typeof img === 'string' && !img.startsWith('http') && img.length < 200) {
                // If it's a token (doesn't start with http and is short), treat as attachment
                fields.featured_image = [{ file_token: img }]
            } else {
                // It's likely a URL or a pre-formatted array (for updates)
                fields.featured_image = img
            }
        }

        const record = await createRecord(appToken, tableId, fields);
        return record as News;
    },

    /**
     * Update an existing news record
     */
    async updateNews(recordId: string, updates: Partial<News['fields']>): Promise<News> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableNewsContent;

        const record = await updateRecord(appToken, tableId, recordId, updates);
        return record as News;
    },

    /**
     * Delete a news record
     */
    async deleteNews(recordId: string): Promise<boolean> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableNewsContent;

        return await deleteRecord(appToken, tableId, recordId);
    }
};
