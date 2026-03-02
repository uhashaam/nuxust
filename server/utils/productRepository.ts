import { fetchAllRecords, createRecord, updateRecord, deleteRecord, type LarkBaseRecord } from './lark/base';

export interface ProductRecord extends LarkBaseRecord {
    fields: {
        news_id?: string;
        site_id: any[];
        news_title: string;
        news_content: string;
        generation_method: string; // 'Product'
        release_time: number;
        release_status: 'Published' | 'Draft' | 'Trending';
        featured_image?: string | any[];
        author_email?: string; // Used for Price / Categories as JSON if needed
    }
}

export const productRepository = {
    async getAllProducts(): Promise<ProductRecord[]> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = process.env.LARK_TABLE_PRODUCTS || config.public.larkTableNewsContent;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing for products' });
        }

        const records = await fetchAllRecords(appToken, tableId);
        // Filter for products (assuming we use generation_method or a specific category)
        return records.filter(r => r.fields.generation_method === 'Product') as ProductRecord[];
    },

    async createProduct(productData: any): Promise<ProductRecord> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = process.env.LARK_TABLE_PRODUCTS || config.public.larkTableNewsContent;

        const fields: Record<string, any> = {
            news_title: productData.name,
            news_content: productData.description,
            generation_method: 'Product', // Mark as product
            release_time: Date.now(),
            release_status: 'Published',
            // Hack: Store complex data in author_email if it's just a string, 
            // or better, if LARK_TABLE_PRODUCTS exists, use real fields.
            author_email: JSON.stringify({
                category: productData.category,
                price: productData.price,
                shortDescription: productData.shortDescription,
                specifications: productData.specifications,
                slug: productData.slug
            })
        };

        if (productData.site_id) {
            fields.site_id = Array.isArray(productData.site_id) ? productData.site_id : [productData.site_id];
        }

        if (productData.image) {
            fields.featured_image = productData.image;
        }

        return await createRecord(appToken, tableId, fields) as ProductRecord;
    },

    async updateProduct(recordId: string, productData: any): Promise<ProductRecord> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = process.env.LARK_TABLE_PRODUCTS || config.public.larkTableNewsContent;

        const updates: Record<string, any> = {};
        if (productData.name) updates.news_title = productData.name;
        if (productData.description) updates.news_content = productData.description;

        // Merge existing metadata
        const metadata: any = {};
        if (productData.category) metadata.category = productData.category;
        if (productData.price) metadata.price = productData.price;
        if (productData.shortDescription) metadata.shortDescription = productData.shortDescription;
        if (productData.specifications) metadata.specifications = productData.specifications;
        if (productData.slug) metadata.slug = productData.slug;

        if (Object.keys(metadata).length > 0) {
            updates.author_email = JSON.stringify(metadata);
        }

        if (productData.image) updates.featured_image = productData.image;

        return await updateRecord(appToken, tableId, recordId, updates) as ProductRecord;
    },

    async deleteProduct(recordId: string): Promise<boolean> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = process.env.LARK_TABLE_PRODUCTS || config.public.larkTableNewsContent;

        return await deleteRecord(appToken, tableId, recordId);
    }
};
