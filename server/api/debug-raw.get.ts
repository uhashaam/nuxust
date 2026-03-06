import { fetchAllRecords } from '../../utils/lark/base'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()
    const appToken = config.larkBaseAppToken
    const tableId = config.larkTableProducts

    const records = await fetchAllRecords(appToken, tableId)
    return { records }
})
