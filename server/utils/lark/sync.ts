/**
 * Sync service for real-time synchronization between Lark Base and the application
 */

interface SyncChangeLog {
    timestamp: Date
    tableId: string
    recordId: string
    changeType: 'create' | 'update' | 'delete'
    fields?: Record<string, any>
}

// In-memory change log (in production, consider using Redis or a database)
const changeLog: SyncChangeLog[] = []
const MAX_LOG_SIZE = 1000

/**
 * Log a change for sync tracking
 */
export function logChange(change: Omit<SyncChangeLog, 'timestamp'>) {
    changeLog.push({
        ...change,
        timestamp: new Date(),
    })

    // Keep log size manageable
    if (changeLog.length > MAX_LOG_SIZE) {
        changeLog.shift()
    }
}

/**
 * Get recent changes
 */
export function getRecentChanges(since?: Date): SyncChangeLog[] {
    if (!since) {
        return [...changeLog]
    }

    return changeLog.filter(change => change.timestamp > since)
}

/**
 * Clear change log (call after successful sync)
 */
export function clearChangeLog() {
    changeLog.length = 0
}

/**
 * Sync detector - checks if data needs syncing
 */
export function needsSync(tableId: string, lastSyncTime: Date): boolean {
    return changeLog.some(
        change => change.tableId === tableId && change.timestamp > lastSyncTime
    )
}

/**
 * Get table-specific changes
 */
export function getTableChanges(tableId: string, since?: Date): SyncChangeLog[] {
    let changes = changeLog.filter(change => change.tableId === tableId)

    if (since) {
        changes = changes.filter(change => change.timestamp > since)
    }

    return changes
}

/**
 * Webhook event handler for Lark Base changes
 * Note: Requires Lark webhook to be configured in Lark Admin Portal
 */
export interface LarkWebhookEvent {
    type: string
    app_id: string
    event: {
        app_token: string
        table_id: string
        record_id?: string
        action: 'create' | 'update' | 'delete'
        fields?: Record<string, any>
    }
}

/**
 * Process webhook event from Lark
 */
export async function processWebhookEvent(event: LarkWebhookEvent) {
    const { app_token, table_id, record_id, action, fields } = event.event

    // Log the change
    if (record_id) {
        logChange({
            tableId: table_id,
            recordId: record_id,
            changeType: action,
            fields,
        })
    }

    // Trigger any necessary sync actions
    // (This would call Cloudflare Pages rebuild, cache invalidation, etc.)
    await triggerSyncActions(table_id, action)

    return { success: true }
}

/**
 * Trigger sync actions based on table changes
 */
async function triggerSyncActions(tableId: string, action: string) {
    const config = useRuntimeConfig()

    // Trigger Cloudflare redeploy if products or industry sites changed
    // since this site uses SSG (Static Site Generation)
    if (tableId === config.larkTableProducts || tableId === config.larkTableIndustrySites) {
        console.log(`Sync action triggered for table ${tableId} (${action}) - Starting redeployment...`)
        try {
            const { useCloudflare } = await import('../cloudflare')
            const cf = useCloudflare()
            await cf.triggerRedeployment()
        } catch (e: any) {
            console.error('Failed to trigger redeployment:', e.message)
        }
    }
}

/**
 * Scheduled sync check (to be called every 5 minutes)
 */
export async function scheduledSyncCheck() {
    const config = useRuntimeConfig()
    const tables = [
        config.larkTableIndustrySites,
        config.larkTableUsers,
        config.larkTablePlansCoupons,
        config.larkTableNewsContent,
        config.larkTableProducts,
    ].filter(Boolean)

    for (const tableId of tables) {
        const changes = getTableChanges(tableId as string, new Date(Date.now() - 5 * 60 * 1000))

        if (changes.length > 0) {
            // Process changes
            await triggerSyncActions(tableId as string, 'scheduled_sync')
        }
    }
}
