import { getDb } from '../databases/index.js'

export const customerRepository = {
  async findByBusiness(businessId: string, options?: { search?: string; page?: number; limit?: number }) {
    const where: Record<string, unknown> = { businessId }
    if (options?.search) {
      where['OR'] = [
        { firstName: { contains: options.search } },
        { lastName: { contains: options.search } },
        { phone: { contains: options.search } },
        { email: { contains: options.search } },
      ]
    }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().customer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      getDb().customer.count({ where }),
    ])
    return { items, total, page, limit }
  },

  async findById(id: string, businessId: string) {
    return getDb().customer.findFirst({ where: { id, businessId } })
  },

  async findByEmail(businessId: string, email: string) {
    return getDb().customer.findFirst({ where: { businessId, email } })
  },

  async create(data: {
    businessId: string; firstName: string; lastName: string
    email?: string; phone?: string; address?: string; notes?: string
  }) {
    return getDb().customer.create({ data })
  },

  async update(id: string, businessId: string, data: Record<string, unknown>) {
    return getDb().customer.update({ where: { id }, data })
  },

  async remove(id: string) {
    return getDb().customer.update({ where: { id }, data: { isActive: false } })
  },

  async getStats(businessId: string) {
    const now = new Date()
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const [total, newThisMonth, highValue] = await Promise.all([
      getDb().customer.count({ where: { businessId, isActive: true } }),
      getDb().customer.count({ where: { businessId, createdAt: { gte: firstOfMonth } } }),
      getDb().customer.count({ where: { businessId, totalSpent: { gte: 50000 } } }),
    ])
    const avgSpendAgg = await getDb().customer.aggregate({
      where: { businessId, isActive: true },
      _avg: { totalSpent: true },
    })
    return {
      total,
      newThisMonth,
      highValueSegment: highValue,
      avgSpend: avgSpendAgg._avg.totalSpent ?? 0,
    }
  },
}