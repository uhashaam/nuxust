import { computed, watch } from 'vue'

export interface NewsItem {
    id: string
    title: string
    category: string
    content: string
    excerpt: string
    image: string
    imageAlt: string
    author: string
    publishedAt: string
    featured: boolean
    trending: boolean
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    tags: string[]
    slug: string
}

const generateSlug = (title: string): string => {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .trim() // Trim leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

export const useNews = () => {
    const newsList = useState<NewsItem[]>('news', () => [])

    // Load initial data
    if (process.client) {
        const stored = localStorage.getItem('nuxt_news_data')
        if (stored) {
            const list = JSON.parse(stored) as NewsItem[]
            // Healing: Ensure all items have a valid slug
            newsList.value = list.map(item => ({
                ...item,
                slug: item.slug && item.slug.trim() ? item.slug.trim() : generateSlug(item.title)
            }))
        } else {
            // Default initial data if nothing in storage
            newsList.value = [
                {
                    id: '1',
                    title: 'Global Tech Summit 2024: The Future of AI in Manufacturing',
                    category: 'Industry',
                    content: '<h2>The Next Industrial Revolution</h2><p>The annual Global Tech Summit kicked off this morning with a focus on artificial intelligence...</p><h3>Key Takeaways</h3><ul style="padding-left: 20px;"><li>AI-driven automation is increasing efficiency by 30%.</li><li>Cloud-edge computing is the new standard.</li><li>Sustainability is no longer optional.</li></ul>',
                    excerpt: 'Exploring the transformative impact of AI on the global manufacturing landscape at the 2024 Tech Summit.',
                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
                    imageAlt: 'Global Tech Summit 2024 hall with AI displays',
                    author: 'Sarah Jenkins',
                    publishedAt: '2024-03-15',
                    featured: true,
                    trending: true,
                    tags: ['AI', 'Manufacturing', 'Technology'],
                    slug: 'global-tech-summit-2024-future-ai-manufacturing'
                },
                {
                    id: '2',
                    title: 'Sustainable Energy Solutions: A New Benchmark for Enterprise',
                    category: 'Enterprise',
                    content: '<h2>Green Energy is Good Business</h2><p>Enterprises worldwide are pivoting towards sustainable energy as a core business strategy...</p>',
                    excerpt: 'How the shift to renewable energy is redefining profitability and corporate responsibility in the modern era.',
                    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
                    imageAlt: 'Modern solar panel array under clear blue sky',
                    author: 'Michael Chen',
                    publishedAt: '2024-03-20',
                    featured: true,
                    trending: true,
                    tags: ['Energy', 'Sustainability', 'Green Tech'],
                    slug: 'sustainable-energy-solutions-benchmark-enterprise'
                },
                {
                    id: '3',
                    title: 'Market Analysis: The Rise of Decentralized Infrastructure',
                    category: 'Market',
                    content: '<h2>Breaking Down The Data</h2><p>Our recent market analysis unveils a significant trend towards decentralized systems...</p>',
                    excerpt: 'A deep dive into why industry leaders are abandoning traditional centralized architectures for more resilient models.',
                    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
                    imageAlt: 'Globe with digital connections',
                    author: 'Dr. Alan Grant',
                    publishedAt: '2024-04-01',
                    featured: true,
                    trending: false,
                    tags: ['Market', 'Decentralized', 'Web3'],
                    slug: 'market-analysis-rise-decentralized-infrastructure'
                }
            ]
            localStorage.setItem('nuxt_news_data', JSON.stringify(newsList.value))
        }
    }

    // Persist changes
    if (process.client) {
        watch(newsList, (newVal) => {
            localStorage.setItem('nuxt_news_data', JSON.stringify(newVal))
        }, { deep: true })
    }

    const categories = computed(() => {
        const cats = new Set(newsList.value.map(n => n.category))
        return Array.from(cats)
    })

    const getNewsById = (id: string) => {
        return newsList.value.find(n => n.id === id)
    }

    const getNewsBySlug = (slug: string) => {
        return newsList.value.find(n => n.slug === slug)
    }

    const popularNews = computed(() => {
        return newsList.value.filter(n => n.trending || n.featured)
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    })

    const addNews = (item: Omit<NewsItem, 'id' | 'slug'> & { slug?: string }) => {
        const id = Date.now().toString()
        const slug = item.slug && item.slug.trim() ? item.slug.trim() : generateSlug(item.title)
        const newItem: NewsItem = {
            ...item,
            id,
            slug
        }
        newsList.value.push(newItem)
    }

    const updateNews = (id: string, updatedItem: Partial<NewsItem>) => {
        const index = newsList.value.findIndex(n => n.id === id)
        if (index !== -1) {
            const currentItem = newsList.value[index]
            let newSlug = updatedItem.slug

            // If no manual slug provided, or manual slug is empty
            if (!newSlug || !newSlug.trim()) {
                // If title changed OR if current item is missing a slug
                if ((updatedItem.title && updatedItem.title !== currentItem.title) || !currentItem.slug) {
                    newSlug = generateSlug(updatedItem.title || currentItem.title)
                } else {
                    newSlug = currentItem.slug
                }
            }

            newsList.value[index] = {
                ...currentItem,
                ...updatedItem,
                slug: newSlug
            }
        }
    }

    const deleteNews = (id: string) => {
        newsList.value = newsList.value.filter(n => n.id !== id)
    }

    return { newsList, categories, popularNews, getNewsById, getNewsBySlug, addNews, updateNews, deleteNews }
}
