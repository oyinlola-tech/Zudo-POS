import { getDb } from '../databases/index.js'

export const notificationRepository = {
  async findByUser(userId: string, options?: { page?: number; limit?: number }) {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const pattern = `notif_${userId}_%`
    const all = await getDb().businessSetting.findMany({
      where: { key: { startsWith: `notif_${userId}_` } },
      orderBy: { createdAt: 'desc' },
    })
    const items = all.slice((page - 1) * limit, page * limit).map(r => {
      try { return { id: r.id, ...JSON.parse(r.value), createdAt: r.createdAt } }
      catch { return { id: r.id, message: r.value, createdAt: r.createdAt } }
    })
    return { items, total: all.length, page, limit }
  },

  async markRead(notificationId: string) {
    const row = await getDb().businessSetting.findUnique({ where: { id: notificationId } })
    if (!row) throw new Error('Notification not found')
    const value = JSON.parse(row.value)
    value.read = true
    await getDb().businessSetting.update({ where: { id: notificationId }, data: { value: JSON.stringify(value) } })
    return { id: notificationId, ...value, read: true }
  },

  async markAllRead(userId: string) {
    const rows = await getDb().businessSetting.findMany({
      where: { key: { startsWith: `notif_${userId}_` } },
    })
    for (const row of rows) {
      try {
        const value = JSON.parse(row.value)
        if (!value.read) {
          value.read = true
          await getDb().businessSetting.update({ where: { id: row.id }, data: { value: JSON.stringify(value) } })
        }
      } catch {}
    }
    return { message: 'All notifications marked as read' }
  },

  async create(userId: string, data: { title: string; message: string; type?: string }) {
    const key = `notif_${userId}_${Date.now()}`
    const value = JSON.stringify({ ...data, read: false })
    const created = await getDb().businessSetting.create({ data: { businessId: '', key, value } })
    return { id: created.id, ...data, read: false, createdAt: created.createdAt }
  },

  async broadcast(businessId: string, data: { title: string; message: string; type?: string }) {
    const users = await getDb().user.findMany({ where: { businessId, isActive: true } })
    const notifications = await Promise.all(
      users.map(u => this.create(u.id, data))
    )
    return { notifications, sentTo: users.length }
  },

  async getBroadcastHistory(businessId: string) {
    const allUsers = await getDb().user.findMany({ where: { businessId, isActive: true } })
    const userIds = allUsers.map(u => u.id)
    const patterns = userIds.map(id => `notif_${id}_%`)
    const all: Array<Record<string, unknown>> = []
    for (const pattern of patterns) {
      const rows = await getDb().businessSetting.findMany({
        where: { key: { startsWith: pattern.replace(/%$/, '') } },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })
      for (const r of rows) {
        try { all.push({ id: r.id, ...JSON.parse(r.value), createdAt: r.createdAt }) }
        catch {}
      }
    }
    all.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime())
    return { items: all.slice(0, 100) }
  },

  async getUnreadCount(userId: string) {
    const rows = await getDb().businessSetting.findMany({
      where: { key: { startsWith: `notif_${userId}_` } },
    })
    let unread = 0
    for (const row of rows) {
      try {
        const value = JSON.parse(row.value)
        if (!value.read) unread++
      } catch {}
    }
    return { unread }
  },
}