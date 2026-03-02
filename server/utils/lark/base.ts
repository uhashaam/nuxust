import { getTenantAccessToken } from './auth'

export interface LarkBaseRecord {
    record_id?: string
    fields: Record<string, any>
    [key: string]: any
}

export interface LarkBaseListOptions {
    page_size?: number
    page_token?: string
    filter?: string
    sort?: Array<{ field_name: string; desc?: boolean }>
}

async function larkFetch(url: string, options: any = {}) {
    const token = await getTenantAccessToken()

    return $fetch<any>(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

/**
 * Fetch records from a Lark Base table
 */
export async function fetchRecords(
    appToken: string,
    tableId: string,
    options: LarkBaseListOptions = {}
): Promise<{ records: LarkBaseRecord[]; hasMore: boolean; pageToken?: string }> {
    try {
        const query: any = {
            page_size: options.page_size || 100
        }
        if (options.page_token) query.page_token = options.page_token
        if (options.filter) query.filter = options.filter
        if (options.sort) query.sort = JSON.stringify(options.sort)

        const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
            method: 'GET',
            query
        })

        if (response.code !== 0) {
            throw new Error(`Lark API error: ${response.msg}`)
        }

        return {
            records: response.data?.items || [],
            hasMore: response.data?.has_more || false,
            pageToken: response.data?.page_token,
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch records from table ${tableId}: ${error.message}`)
    }
}

/**
 * Fetch all records from a Lark Base table (handles pagination automatically)
 */
export async function fetchAllRecords(
    appToken: string,
    tableId: string,
    options: LarkBaseListOptions = {}
): Promise<LarkBaseRecord[]> {
    const allRecords: LarkBaseRecord[] = []
    let pageToken: string | undefined = undefined
    let hasMore = true

    while (hasMore) {
        const result = await fetchRecords(appToken, tableId, {
            ...options,
            page_token: pageToken,
        })

        allRecords.push(...result.records)
        hasMore = result.hasMore
        pageToken = result.pageToken
    }

    return allRecords
}

/**
 * Get a single record by ID
 */
export async function getRecord(
    appToken: string,
    tableId: string,
    recordId: string
): Promise<LarkBaseRecord | null> {
    try {
        const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`, {
            method: 'GET'
        })

        if (response.code !== 0) {
            return null
        }

        return response.data?.record || null
    } catch (error) {
        return null
    }
}

export async function createRecord(
    appToken: string,
    tableId: string,
    fields: Record<string, any>
): Promise<LarkBaseRecord> {
    try {
        const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
            method: 'POST',
            body: {
                fields,
            }
        })

        if (response.code !== 0 || !response.data?.record) {
            throw new Error(`Lark Error (${response.code}): ${response.msg || 'Failed to create record'}`)
        }

        return response.data.record
    } catch (error: any) {
        throw error
    }
}

/**
 * Update an existing record
 */
export async function updateRecord(
    appToken: string,
    tableId: string,
    recordId: string,
    fields: Record<string, any>
): Promise<LarkBaseRecord> {
    try {
        const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`, {
            method: 'PATCH', // Changed from PUT to PATCH for partial updates
            body: {
                fields,
            }
        })

        if (response.code !== 0 || !response.data?.record) {
            throw new Error(`Lark Error (${response.code}): ${response.msg || 'Failed to update record'}`)
        }

        return response.data.record
    } catch (error: any) {
        throw error
    }
}

/**
 * Delete a record
 */
export async function deleteRecord(
    appToken: string,
    tableId: string,
    recordId: string
): Promise<boolean> {
    try {
        const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`, {
            method: 'DELETE'
        })

        return response.code === 0
    } catch (error) {
        return false
    }
}

/**
 * Batch create records (max 500 per batch)
 */
export async function batchCreateRecords(
    appToken: string,
    tableId: string,
    records: Array<{ fields: Record<string, any> }>
): Promise<LarkBaseRecord[]> {
    const BATCH_SIZE = 500
    const allCreatedRecords: LarkBaseRecord[] = []

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE)

        try {
            const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_create`, {
                method: 'POST',
                body: {
                    records: batch,
                }
            })

            if (response.code !== 0) {
                throw new Error(`Lark API error: ${response.msg}`)
            }

            if (response.data?.records) {
                allCreatedRecords.push(...response.data.records)
            }
        } catch (error: any) {
            throw new Error(`Failed to batch create records at batch ${i / BATCH_SIZE + 1}: ${error.message || 'Unknown error'}`)
        }
    }

    return allCreatedRecords
}

/**
 * Batch update records (max 500 per batch)
 */
export async function batchUpdateRecords(
    appToken: string,
    tableId: string,
    records: Array<{ record_id: string; fields: Record<string, any> }>
): Promise<LarkBaseRecord[]> {
    const BATCH_SIZE = 500
    const allUpdatedRecords: LarkBaseRecord[] = []

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE)

        try {
            const response = await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_update`, {
                method: 'POST',
                body: {
                    records: batch,
                }
            })

            if (response.data?.records) {
                allUpdatedRecords.push(...response.data.records)
            }
        } catch (error: any) {
            throw new Error(`Failed to batch update records at batch ${i / BATCH_SIZE + 1}`)
        }
    }

    return allUpdatedRecords
}

/**
 * Batch delete records (max 500 per batch)
 */
export async function batchDeleteRecords(
    appToken: string,
    tableId: string,
    recordIds: string[]
): Promise<boolean> {
    const BATCH_SIZE = 500

    for (let i = 0; i < recordIds.length; i += BATCH_SIZE) {
        const batch = recordIds.slice(i, i + BATCH_SIZE)

        try {
            await larkFetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_delete`, {
                method: 'POST',
                body: {
                    records: batch,
                }
            })
        } catch (error) {
            return false
        }
    }

    return true
}

/**
 * Upload an attachment to a Lark Base table
 */
export async function uploadAttachment(
    appToken: string,
    tableId: string,
    file: {
        fileName: string;
        contentType: string;
        buffer: any;
    }
): Promise<string> {
    try {
        const token = await getTenantAccessToken()

        // Note: For multipart/form-data, $fetch and Cloudflare Workers handle FormData automatically
        const formData = new FormData()
        formData.append('file_name', file.fileName)
        formData.append('parent_type', 'bitable_image')
        formData.append('parent_node', appToken)
        formData.append('size', String(file.buffer.length))

        // Create a Blob from the buffer if it's not already one
        const blob = file.buffer instanceof Blob ? file.buffer : new Blob([file.buffer], { type: file.contentType })
        formData.append('file', blob, file.fileName)

        const response = await $fetch<any>('https://open.larksuite.com/open-apis/drive/v1/medias/upload_all', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (!response || !response.data?.file_token) {
            throw new Error(`Upload failed: ${JSON.stringify(response)}`)
        }

        return response.data.file_token
    } catch (error: any) {
        throw error
    }
}
