import * as lark from '@larksuiteoapi/node-sdk'
import { getLarkClient } from './auth'

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

/**
 * Fetch records from a Lark Base table
 */
export async function fetchRecords(
    appToken: string,
    tableId: string,
    options: LarkBaseListOptions = {}
): Promise<{ records: LarkBaseRecord[]; hasMore: boolean; pageToken?: string }> {
    const client = getLarkClient()

    try {
        const response = await client.bitable.appTableRecord.list({
            path: {
                app_token: appToken,
                table_id: tableId,
            },
            params: {
                page_size: options.page_size || 100,
                page_token: options.page_token,
                filter: options.filter,
                sort: options.sort ? JSON.stringify(options.sort) : undefined,
            },
        })

        return {
            records: response.data?.items || [],
            hasMore: response.data?.has_more || false,
            pageToken: response.data?.page_token,
        }
    } catch (error) {
        throw new Error(`Failed to fetch records from table ${tableId}`)
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
    const client = getLarkClient()

    try {
        const response = await client.bitable.appTableRecord.get({
            path: {
                app_token: appToken,
                table_id: tableId,
                record_id: recordId,
            },
        })

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
    const client = getLarkClient()

    try {
        const response = await client.bitable.appTableRecord.create({
            path: {
                app_token: appToken,
                table_id: tableId,
            },
            data: {
                fields,
            },
        })

        if (response.code !== 0 || !response.data?.record) {
            const errorMsg = `Lark Error (${response.code}): ${response.msg || 'Failed to create record'}`

            throw new Error(errorMsg)
        }

        return response.data.record
    } catch (error: any) {
        console.error('[Lark Exception] Create failed:', error)
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
    const client = getLarkClient()

    try {
        const response = await client.bitable.appTableRecord.update({
            path: {
                app_token: appToken,
                table_id: tableId,
                record_id: recordId,
            },
            data: {
                fields,
            },
        })

        if (response.code !== 0 || !response.data?.record) {
            const errorMsg = `Lark Error (${response.code}): ${response.msg || 'Failed to update record'}`

            throw new Error(errorMsg)
        }

        return response.data.record
    } catch (error: any) {
        console.error('[Lark Exception] Update failed:', error)
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
    const client = getLarkClient()

    try {
        await client.bitable.appTableRecord.delete({
            path: {
                app_token: appToken,
                table_id: tableId,
                record_id: recordId,
            },
        })

        return true
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
    const client = getLarkClient()
    const BATCH_SIZE = 500
    const allCreatedRecords: LarkBaseRecord[] = []

    // Split into batches of 500
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE)

        try {
            const response = await client.bitable.appTableRecord.batchCreate({
                path: {
                    app_token: appToken,
                    table_id: tableId,
                },
                data: {
                    records: batch,
                },
            })

            if (response.code !== 0) {
                console.error(`Lark API error (code ${response.code}):`, response.msg)
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
    const client = getLarkClient()
    const BATCH_SIZE = 500
    const allUpdatedRecords: LarkBaseRecord[] = []

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE)

        try {
            const response = await client.bitable.appTableRecord.batchUpdate({
                path: {
                    app_token: appToken,
                    table_id: tableId,
                },
                data: {
                    records: batch,
                },
            })

            if (response.data?.records) {
                allUpdatedRecords.push(...response.data.records)
            }
        } catch (error) {
            console.error(`Error batch updating records (batch ${i / BATCH_SIZE + 1}):`, error)
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
    const client = getLarkClient()
    const BATCH_SIZE = 500

    for (let i = 0; i < recordIds.length; i += BATCH_SIZE) {
        const batch = recordIds.slice(i, i + BATCH_SIZE)

        try {
            await client.bitable.appTableRecord.batchDelete({
                path: {
                    app_token: appToken,
                    table_id: tableId,
                },
                data: {
                    records: batch,
                },
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
        buffer: Buffer | Uint8Array;
    }
): Promise<string> {
    const client = getLarkClient()

    try {
        // Use client.drive.media.uploadAll instead of bitable.appMedia.upload
        // The latter is undefined in some SDK versions
        const response: any = await client.drive.media.uploadAll({
            data: {
                file_name: file.fileName,
                parent_type: 'bitable_image',
                parent_node: appToken,
                size: file.buffer.length,
                file: file.buffer,
            },
        })

        if (!response || !response.file_token) {
            throw new Error(`Upload failed: ${JSON.stringify(response)}`)
        }

        return response.file_token
    } catch (error: any) {
        throw error
    }
}
