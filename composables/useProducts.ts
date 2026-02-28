import { computed, watch } from 'vue'

export interface Product {
    id: string
    name: string
    category: string
    description: string
    shortDescription: string
    image: string
    imageAlt: string
    gallery: string[]
    price: number
    specifications: Record<string, string>
    featured: boolean
    externalLink: string
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    slug: string
}

const generateSlug = (text: string) => {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .trim() // Trim leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

export const useProducts = () => {
    const productList = useState<Product[]>('products', () => [])
    const isLoading = useState('products-loading', () => false)

    const fetchProducts = async () => {
        isLoading.value = true
        try {
            const data = await $fetch('/api/products/all')
            if (data.success) {
                productList.value = data.products
            }
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            isLoading.value = false
        }
    }

    // Initial load
    if (process.server || (process.client && productList.value.length === 0)) {
        if (!isLoading.value) {
            fetchProducts()
        }
    }

    const categories = computed(() => {
        const cats = new Set(productList.value.map(p => p.category))
        return Array.from(cats)
    })

    const getProductById = (id: string) => {
        return productList.value.find(p => p.id === id)
    }

    const getProductBySlug = (slug: string) => {
        return productList.value.find(p => p.slug === slug)
    }

    const addProduct = async (item: Omit<Product, 'id' | 'slug'> & { slug?: string }) => {
        isLoading.value = true
        try {
            await $fetch('/api/products/create', {
                method: 'POST',
                body: {
                    ...item,
                    slug: item.slug || generateSlug(item.name)
                }
            })
            await fetchProducts()
        } catch (error) {
            console.error('Failed to add product:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const updateProduct = async (id: string, updatedItem: Partial<Product>) => {
        isLoading.value = true
        try {
            await $fetch('/api/products/update', {
                method: 'POST',
                body: {
                    id,
                    ...updatedItem
                }
            })
            await fetchProducts()
        } catch (error) {
            console.error('Failed to update product:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const deleteProduct = async (id: string) => {
        isLoading.value = true
        try {
            await $fetch('/api/products/delete', {
                method: 'POST',
                body: { id }
            })
            await fetchProducts()
        } catch (error) {
            console.error('Failed to delete product:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    return { productList, isLoading, categories, getProductById, getProductBySlug, addProduct, updateProduct, deleteProduct, fetchProducts }
}

