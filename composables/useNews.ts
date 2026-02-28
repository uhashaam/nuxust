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
    industry?: string
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
    const isLoading = useState('news-loading', () => false)

    const fetchNews = async () => {
        isLoading.value = true
        try {
            const data = await $fetch('/api/news/all')
            if (data.success) {
                newsList.value = data.news as any[]
            }
        } catch (error) {
            console.error('Failed to fetch news:', error)
        } finally {
            isLoading.value = false
        }
    }

    // Load initial data on server or client if empty
    if (process.server || (process.client && newsList.value.length === 0)) {
        if (!isLoading.value) {
            fetchNews()
        }
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

    const addNews = async (item: Omit<NewsItem, 'id' | 'slug'> & { slug?: string }) => {
        isLoading.value = true
        try {
            await $fetch('/api/news/create', {
                method: 'POST',
                body: {
                    title: item.title,
                    content: item.content,
                    slug: item.slug,
                    category: item.category,
                    image_url: item.image,
                    featured: item.featured,
                    trending: item.trending,
                    author: item.author,
                    publishedAt: item.publishedAt
                }
            })
            await fetchNews() // Refresh from Lark
        } catch (error) {
            console.error('Failed to add news:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const updateNews = async (id: string, updatedItem: Partial<NewsItem>) => {
        isLoading.value = true
        try {
            await $fetch('/api/news/update', {
                method: 'POST',
                body: {
                    id,
                    ...updatedItem,
                    release_status: updatedItem.featured ? 'Trending' : 'Published'
                }
            })
            await fetchNews() // Refresh from Lark
        } catch (error) {
            console.error('Failed to update news:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const deleteNews = async (id: string) => {
        isLoading.value = true
        try {
            await $fetch('/api/news/delete', {
                method: 'POST',
                body: { id }
            })
            await fetchNews() // Refresh from Lark
        } catch (error) {
            console.error('Failed to delete news:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    return { newsList, isLoading, categories, popularNews, getNewsById, getNewsBySlug, addNews, updateNews, deleteNews, fetchNews }
}
