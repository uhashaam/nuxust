import { watch } from 'vue'

export interface MediaItem {
    id: string
    url: string
    name: string
    alt: string
    type: string
    size: number
    updatedAt: string
    token?: string // Lark file token for attachments
}

export const useMedia = () => {
    const mediaList = useState<MediaItem[]>('media_library', () => [])

    const fetchMedia = async () => {
        try {
            const data = await $fetch<{ success: boolean; media: MediaItem[] }>('/api/media/all')
            if (data.success) {
                mediaList.value = data.media
            }
        } catch (error) {
            console.error('Failed to fetch media:', error)
        }
    }

    // Load initial data
    if (process.client && mediaList.value.length === 0) {
        fetchMedia()
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
