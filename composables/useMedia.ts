import { watch } from 'vue'

export interface MediaItem {
    id: string
    url: string
    name: string
    alt: string
    type: string
    size: number
    updatedAt: string
}

export const useMedia = () => {
    const mediaList = useState<MediaItem[]>('media_library', () => [])

    // Load initial data
    if (process.client) {
        const stored = localStorage.getItem('nuxt_media_data')
        if (stored) {
            mediaList.value = JSON.parse(stored)
        } else {
            // Default initial data if nothing in storage
            mediaList.value = [
                {
                    id: '1',
                    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
                    name: 'Tech Summit.jpg',
                    alt: 'Global Tech Summit 2024 hall with AI displays',
                    type: 'image/jpeg',
                    size: 102400,
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '2',
                    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
                    name: 'Solar Panels.jpg',
                    alt: 'Modern solar panel array under clear blue sky',
                    type: 'image/jpeg',
                    size: 204800,
                    updatedAt: new Date().toISOString()
                }
            ]
            localStorage.setItem('nuxt_media_data', JSON.stringify(mediaList.value))
        }
    }

    // Persist changes
    if (process.client) {
        watch(mediaList, (newVal) => {
            localStorage.setItem('nuxt_media_data', JSON.stringify(newVal))
        }, { deep: true })
    }

    const addMedia = (item: Omit<MediaItem, 'id' | 'updatedAt'>) => {
        const newItem: MediaItem = {
            ...item,
            id: Date.now().toString(),
            updatedAt: new Date().toISOString()
        }
        mediaList.value.unshift(newItem)
        return newItem
    }

    const updateMedia = (id: string, updates: Partial<MediaItem>) => {
        const index = mediaList.value.findIndex(m => m.id === id)
        if (index !== -1) {
            mediaList.value[index] = {
                ...mediaList.value[index],
                ...updates,
                updatedAt: new Date().toISOString()
            } as MediaItem
        }
    }

    const deleteMedia = (id: string) => {
        mediaList.value = mediaList.value.filter(m => m.id !== id)
    }

    return {
        mediaList,
        addMedia,
        updateMedia,
        deleteMedia
    }
}
