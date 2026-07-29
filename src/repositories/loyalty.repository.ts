import { getDb } from '../databases/index.js'

export const loyaltyRepository = {
  async findByBusiness(businessId: string, options?: { tier?: string; search?: string; page?: number; limit?: number }) {
    const where: Record<string, unknown> = { businessId, isActive: true, points: { gt: 0 } }
    if (options?.tier) where['loyaltyTier'] = options.tier
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
        orderBy: { points: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      getDb().customer.count({ where }),
    ])
    return { items, total, page, limit }
  },

  async findById(id: string, businessId: string) {
    return getDb().customer.findFirst({ where: { id, businessId, isActive: true } })
  },

  async updateTier(id: string, businessId: string, tier: string) {
    return getDb().customer.update({ where: { id }, data: { loyaltyTier: tier } })
  },
}
