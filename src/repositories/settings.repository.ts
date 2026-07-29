import { getDb } from '../databases/index.js'

export const settingsRepository = {
  async getAll(businessId: string) {
    const rows = await getDb().businessSetting.findMany({ where: { businessId } })
    const settings: Record<string, string> = {}
    for (const row of rows) settings[row.key] = row.value
    return settings
  },

  async upsert(businessId: string, key: string, value: string) {
    return getDb().businessSetting.upsert({
      where: { businessId_key: { businessId, key } },
      update: { value },
      create: { businessId, key, value },
    })
  },

  async upsertMany(businessId: string, entries: Record<string, string>) {
    for (const [key, value] of Object.entries(entries)) {
      await this.upsert(businessId, key, value)
    }
  },

  async delete(businessId: string, key: string) {
    return getDb().businessSetting.deleteMany({ where: { businessId, key } })
  },

  async getBranches(businessId: string) {
    const rows = await getDb().businessSetting.findMany({
      where: { businessId, key: { startsWith: 'branch_' } },
      orderBy: { createdAt: 'asc' },
    })
    return rows.map(r => {
      try { return { id: r.id, ...JSON.parse(r.value) } }
      catch { return { id: r.id, name: r.value } }
    })
  },

  async getBranch(businessId: string, id: string) {
    const row = await getDb().businessSetting.findFirst({ where: { id, businessId, key: { startsWith: 'branch_' } } })
    if (!row) return null
    try { return { id: row.id, ...JSON.parse(row.value) } }
    catch { return { id: row.id, name: row.value } }
  },

  async upsertBranch(businessId: string, id: string | null, data: Record<string, unknown>) {
    if (id) {
      await getDb().businessSetting.update({ where: { id }, data: { value: JSON.stringify(data) } })
      return { id, ...data }
    }
    const created = await getDb().businessSetting.create({
      data: { businessId, key: `branch_${Date.now()}`, value: JSON.stringify(data) },
    })
    return { id: created.id, ...data }
  },
}