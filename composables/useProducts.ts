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

    // Load initial data
    if (process.client) {
        const stored = localStorage.getItem('nuxt_products_data')
        if (stored) {
            const list = JSON.parse(stored) as Product[]
            // Healing: Ensure all items have a valid slug
            productList.value = list.map(item => ({
                ...item,
                slug: item.slug && item.slug.trim() ? item.slug.trim() : generateSlug(item.name)
            }))
        } else {
            // Default initial data if nothing in storage
            productList.value = [
                {
                    id: '1',
                    name: 'Aether Cloud Engine X1',
                    category: 'Software',
                    description: '<h2>Unmatched Computational Power</h2><p>Designed for large-scale data processing, the Aether Cloud Engine provides unparalleled speed and reliability for enterprise workloads.</p>',
                    shortDescription: 'Unmatched computational power for modern enterprise workloads.',
                    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80',
                    imageAlt: 'Data center server racks',
                    gallery: [],
                    price: 2499,
                    specifications: {
                        'Core Clock': '5.2 GHz',
                        'Max Nodes': '50,000+',
                        'Latency': '< 0.5ms',
                        'Uptime': '99.999%'
                    } as Record<string, string>,
                    featured: true,
                    externalLink: 'https://example.com/aether',
                    slug: generateSlug('Aether Cloud Engine X1')
                },
                {
                    id: '2',
                    name: 'Nexus IoT Gateway Hub',
                    category: 'Hardware',
                    description: '<h2>Seed Your Connected Future</h2><p>The Nexus Hub is the heart of your industrial IoT network, connecting thousands of sensors with secure, low-latency protocols.</p>',
                    shortDescription: 'Secure, high-bandwidth gateway for industrial IoT networks.',
                    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
                    imageAlt: 'Industrial IoT gateway device',
                    gallery: [],
                    price: 899,
                    specifications: {
                        'Connectivity': '5G / Wi-Fi 6',
                        'Encryption': 'AES-256',
                        'Ports': '8x Gigabit Ethernet',
                        'Rating': 'IP67 Waterproof'
                    } as Record<string, string>,
                    featured: true,
                    externalLink: 'https://example.com/nexus',
                    slug: generateSlug('Nexus IoT Gateway Hub')
                },
                {
                    id: '3',
                    name: 'Sentinel Analytics AI',
                    category: 'SaaS',
                    description: '<h2>See What Matters Most</h2><p>Sentinel uses advanced neural networks to identify anomalies in your sales data before they impact your bottom line.</p>',
                    shortDescription: 'AI-driven business analytics for proactive decision making.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
                    imageAlt: 'AI analytics dashboard',
                    gallery: [],
                    price: 159,
                    specifications: {
                        'AI Model': 'Sentinel v4.2',
                        'Data Sources': 'RestAPI / SQL / CSV',
                        'Alerting': 'Real-time',
                        'Platform': 'Cross-browser Cloud'
                    } as Record<string, string>,
                    featured: true,
                    externalLink: 'https://example.com/sentinel',
                    slug: generateSlug('Sentinel Analytics AI')
                },
                {
                    id: '4',
                    name: 'Titanium Storage Array 10PB',
                    category: 'Hardware',
                    description: '<h2>Extreme Density Storage</h2><p>The Titanium Array offers 10 Petabytes of high-performance NVMe storage in a compact 4U footprint.</p>',
                    shortDescription: 'Industrial-grade high-density storage for big data applications.',
                    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80',
                    imageAlt: 'High density storage array',
                    gallery: [],
                    price: 15499,
                    specifications: {
                        'Capacity': '10 Petabytes',
                        'Type': 'All-Flash NVMe',
                        'Interface': '100GbE',
                        'Redundancy': 'N+2'
                    } as Record<string, string>,
                    featured: false,
                    externalLink: 'https://example.com/titanium',
                    slug: generateSlug('Titanium Storage Array 10PB')
                },
                {
                    id: '5',
                    name: 'LogicFlow Automation Kit',
                    category: 'Tools',
                    description: '<h2>Design Better Workflows</h2><p>LogicFlow is a visual automation tool that allows your team to build complex digital workflows without writing a single line of code.</p>',
                    shortDescription: 'Visual workflow automation for modern digital teams.',
                    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80',
                    imageAlt: 'Workflow automation interface',
                    gallery: [],
                    price: 79,
                    specifications: {
                        'Visual Engine': 'FlowViz 2.0',
                        'Integrations': '1000+',
                        'Deployment': 'Docker / Cloud',
                        'Licensing': 'Per user/mo'
                    } as Record<string, string>,
                    featured: false,
                    externalLink: 'https://example.com/logicflow',
                    slug: generateSlug('LogicFlow Automation Kit')
                }
            ]
            localStorage.setItem('nuxt_products_data', JSON.stringify(productList.value))
        }
    }

    // Persist changes
    if (process.client) {
        watch(productList, (newVal) => {
            localStorage.setItem('nuxt_products_data', JSON.stringify(newVal))
        }, { deep: true })
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

    const addProduct = (item: Omit<Product, 'id' | 'slug'> & { slug?: string }) => {
        const id = Date.now().toString()
        const slug = item.slug && item.slug.trim() ? item.slug.trim() : generateSlug(item.name)
        const newItem: Product = {
            ...item,
            id,
            slug
        }
        productList.value.push(newItem)
    }

    const updateProduct = (id: string, updatedItem: Partial<Product>) => {
        const index = productList.value.findIndex(p => p.id === id)
        if (index !== -1) {
            const currentProduct = productList.value[index]
            if (currentProduct) {
                let newSlug = updatedItem.slug

                // If no manual slug provided, or manual slug is empty
                if (!newSlug || !newSlug.trim()) {
                    // If name changed OR if current item is missing a slug
                    if ((updatedItem.name && updatedItem.name !== currentProduct.name) || !currentProduct.slug) {
                        newSlug = generateSlug(updatedItem.name || currentProduct.name)
                    } else {
                        newSlug = currentProduct.slug
                    }
                }

                productList.value[index] = {
                    ...currentProduct,
                    ...updatedItem,
                    slug: newSlug
                } as Product
            }
        }
    }

    const deleteProduct = (id: string) => {
        productList.value = productList.value.filter(p => p.id !== id)
    }

    return { productList, categories, getProductById, getProductBySlug, addProduct, updateProduct, deleteProduct }
}
