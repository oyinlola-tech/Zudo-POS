import { getDb } from '../databases/index.js'

export const auditLogRepository = {
  async findByBusiness(businessId: string, options?: {
    page?: number; limit?: number; action?: string; startDate?: string; endDate?: string
  }) {
    const where: Record<string, unknown> = { user: { businessId } }
    if (options?.action) where['action'] = options.action
    if (options?.startDate || options?.endDate) {
      const createdAt: Record<string, Date> = {}
      if (options?.startDate) createdAt['gte'] = new Date(options.startDate)
      if (options?.endDate) createdAt['lte'] = new Date(options.endDate)
      where['createdAt'] = createdAt
    }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().auditLog.findMany({
        where: where as never,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
      }),
      getDb().auditLog.count({ where: where as never }),
    ])
    return { items, total, page, limit }
  },

  async findAll(options?: {
    page?: number; limit?: number; action?: string; startDate?: string; endDate?: string
  }) {
    const where: Record<string, unknown> = {}
    if (options?.action) where['action'] = options.action
    if (options?.startDate || options?.endDate) {
      const createdAt: Record<string, Date> = {}
      if (options?.startDate) createdAt['gte'] = new Date(options.startDate)
      if (options?.endDate) createdAt['lte'] = new Date(options.endDate)
      where['createdAt'] = createdAt
    }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().auditLog.findMany({
        where: where as never,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
      }),
      getDb().auditLog.count({ where: where as never }),
    ])
    return { items, total, page, limit }
  },

  async findById(id: string) {
    return getDb().auditLog.findUnique({
      where: { id },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
    })
  },
}