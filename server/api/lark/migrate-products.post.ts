
import { batchCreateRecords } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    // Fallback to news table if products table not defined, but ideally should be separate
    const tableId = process.env.LARK_TABLE_PRODUCTS || config.public.larkTableIds.newsContent;

    if (!appToken || !tableId) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Lark Base configuration missing (appToken or products tableId)'
        });
    }

    // Raw data from useProducts.ts
    const productData = [
        {
            id: '1',
            name: 'Aether Cloud Engine X1',
            category: 'Software',
            description: '<h2>Unmatched Computational Power</h2><p>Designed for large-scale data processing...</p>',
            shortDescription: 'Unmatched computational power for modern enterprise workloads.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80',
            imageAlt: 'Data center server racks',
            price: 2499,
            specifications: {
                'Core Clock': '5.2 GHz',
                'Max Nodes': '50,000+',
                'Latency': '< 0.5ms',
                'Uptime': '99.999%'
            },
            featured: true,
            externalLink: 'https://example.com/aether',
            slug: 'aether-cloud-engine-x1'
        },
        {
            // ... other products would go here, truncated for brevity in this script
            id: '2',
            name: 'Nexus IoT Gateway Hub',
            category: 'Hardware',
            price: 899,
            description: '...',
            specifications: { 'Connectivity': '5G' },
            slug: 'nexus-iot-gateway-hub'
        }
    ];

    // Map to Lark Base fields
    // Note: If using News table, we might need to stringify JSON into Content or use different fields
    const recordsToCreate = productData.map(item => {
        return {
            fields: {
                "News Title": item.name, // Mapping Name to Title
                "News Content": item.description, // Mapping Description to Content
                "Industry Type": "Product", // Distinct type
                "Release Status": "Published",
                "Generation Method": "Manual",
                // Store JSON data in a specific text field if available, or append to content?
                // For now, we assume a Products table might exist with these fields:
                // "Product Name", "Category", "Price", "Specifications"
                // If falling back to News table, we lose structure.

                // Extended fields if Products Table exists:
                ...(process.env.LARK_TABLE_PRODUCTS ? {
                    "Product Name": item.name,
                    "Category": item.category,
                    "Price": item.price,
                    "Specifications": JSON.stringify(item.specifications),
                    "Images": [{ text: item.image }] // Attachment or Link
                } : {})
            }
        };
    });

    try {
        const results = await batchCreateRecords(appToken, tableId, recordsToCreate);
        return {
            success: true,
            migratedCount: results.length,
            message: `Migrated to table ${tableId}`
        };
    } catch (error: any) {
        // console.error('Migration failed:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Migration failed: ${error.message}`
        });
    }
});
