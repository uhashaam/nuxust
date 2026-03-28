import { prisma } from './prisma';

export interface ProductRecord {
    record_id: string;
    fields: {
        product_id?: string;
        Text: string; // Primary field (Name)
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

// Map Prisma Model to Lark-Style DB Response
const mapProduct = (pProduct: any): ProductRecord => {
    return {
        record_id: pProduct.id,
        fields: {
            product_id: pProduct.id,
            Text: pProduct.name,
            description: pProduct.description,
            short_description: pProduct.short_description || undefined,
            price: pProduct.price,
            category: pProduct.category || undefined,
            specifications: pProduct.specifications || undefined,
            slug: pProduct.slug,
            featured_image: Array.isArray(pProduct.featured_image) ? pProduct.featured_image : undefined,
            is_featured: pProduct.is_featured
        }
    };
};

export const productRepository = {
    async getAllProducts(): Promise<ProductRecord[]> {
        const products = await prisma.product.findMany();
        return products.map(mapProduct);
    },

    async createProduct(productData: any): Promise<ProductRecord> {
        let featured_image: any = null;

        if (productData.image) {
            if (typeof productData.image === 'string' && !productData.image.startsWith('http')) {
                featured_image = [{ file_token: productData.image }];
            } else if (Array.isArray(productData.image)) {
                featured_image = productData.image;
            } else if (typeof productData.image === 'string') {
                featured_image = [{ url: productData.image }];
            }
        }

        const pProduct = await prisma.product.create({
            data: {
                name: productData.name || productData.Text,
                description: productData.description || '',
                short_description: productData.shortDescription || productData.short_description,
                price: Number(productData.price) || 0,
                category: productData.category,
                specifications: typeof productData.specifications === 'string'
                    ? productData.specifications
                    : JSON.stringify(productData.specifications || {}),
                slug: productData.slug || productData.name?.toLowerCase().replace(/\s+/g, '-'),
                is_featured: !!productData.featured,
                featured_image: featured_image
            }
        });
        return mapProduct(pProduct);
    },

    async updateProduct(recordId: string, productData: any): Promise<ProductRecord> {
        const updates: any = {};
        
        if (productData.name || productData.Text) updates.name = productData.name || productData.Text;
        if (productData.description) updates.description = productData.description;
        if (productData.shortDescription || productData.short_description) updates.short_description = productData.shortDescription || productData.short_description;
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
            } else if (typeof productData.image === 'string') {
                updates.featured_image = [{ url: productData.image }];
            }
        }

        const pProduct = await prisma.product.update({
            where: { id: recordId },
            data: updates
        });
        
        return mapProduct(pProduct);
    },

    async deleteProduct(recordId: string): Promise<boolean> {
        await prisma.product.delete({
            where: { id: recordId }
        });
        return true;
    }
};
