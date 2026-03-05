import { fetchAllRecords, createRecord, updateRecord, deleteRecord, type LarkBaseRecord } from './lark/base';

export interface ProductRecord extends LarkBaseRecord {
    fields: {
        product_id?: string;
        Text: string; // Primary field
        description: string;
        short_description?: string;
        price?: number;
        category?: string;
        specifications?: string; // JSON string
        slug: string;
        featured_image?: any[];
        is_featured?: boolean;
    }
}

export const productRepository = {
    async getAllProducts(): Promise<ProductRecord[]> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableProducts;

        if (!appToken || !tableId) {
            throw createError({ statusCode: 500, statusMessage: 'Lark Base configuration missing for products' });
        }

        const records = await fetchAllRecords(appToken, tableId);
        return records as ProductRecord[];
    },

    async createProduct(productData: any): Promise<ProductRecord> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableProducts;

        const fields: Record<string, any> = {
            Text: productData.name,
            description: productData.description,
            short_description: productData.shortDescription,
            price: Number(productData.price) || 0,
            category: productData.category,
            specifications: typeof productData.specifications === 'string'
                ? productData.specifications
                : JSON.stringify(productData.specifications || {}),
            slug: productData.slug || productData.name?.toLowerCase().replace(/\s+/g, '-'),
            is_featured: !!productData.featured
        };

        if (productData.image) {
            // Handle image as attachment format
            if (typeof productData.image === 'string' && !productData.image.startsWith('http')) {
                fields.featured_image = [{ file_token: productData.image }];
            } else if (Array.isArray(productData.image)) {
                fields.featured_image = productData.image;
            }
        }

        return await createRecord(appToken, tableId, fields) as ProductRecord;
    },

    async updateProduct(recordId: string, productData: any): Promise<ProductRecord> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableProducts;

        const updates: Record<string, any> = {};
        if (productData.name) updates.Text = productData.name;
        if (productData.description) updates.description = productData.description;
        if (productData.shortDescription) updates.short_description = productData.shortDescription;
        if (productData.price !== undefined) updates.price = Number(productData.price);
        if (productData.category) updates.category = productData.category;
        if (productData.specifications) {
            updates.specifications = typeof productData.specifications === 'string'
                ? productData.specifications
                : JSON.stringify(productData.specifications);
        }
        if (productData.slug) updates.slug = productData.slug;
        if (productData.featured !== undefined) updates.is_featured = !!productData.featured;

        if (productData.image) {
            if (typeof productData.image === 'string' && !productData.image.startsWith('http')) {
                updates.featured_image = [{ file_token: productData.image }];
            } else if (Array.isArray(productData.image)) {
                updates.featured_image = productData.image;
            }
        }

        return await updateRecord(appToken, tableId, recordId, updates) as ProductRecord;
    },

    async deleteProduct(recordId: string): Promise<boolean> {
        const config = useRuntimeConfig();
        const appToken = config.larkBaseAppToken;
        const tableId = config.larkTableProducts;

        return await deleteRecord(appToken, tableId, recordId);
    }
};
