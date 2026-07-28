import { getDb } from '../databases/index.js'

export const superadminRepository = {
  async listBusinesses(options?: { search?: string; page?: number; limit?: number }) {
    const where: Record<string, unknown> = {}
    if (options?.search) {
      where['OR'] = [
        { name: { contains: options.search } },
        { email: { contains: options.search } },
      ]
    }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().business.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { users: true, products: true, sales: true } } },
      }),
      getDb().business.count({ where }),
    ])
    return { items, total, page, limit }
  },

  async getBusiness(id: string) {
    return getDb().business.findUnique({
      where: { id },
      include: { _count: { select: { users: true, products: true, sales: true, customers: true } } },
    })
  },

  async updateBusiness(id: string, data: Record<string, unknown>) {
    return getDb().business.update({ where: { id }, data })
  },

  async getRevenueStats() {
    const totalBusinesses = await getDb().business.count()
    const activeBusinesses = await getDb().business.count({ where: { status: 'ACTIVE' } })
    const totalSales = await getDb().sale.count({ where: { status: 'COMPLETED' } })
    const revenue = await getDb().sale.aggregate({ where: { status: 'COMPLETED' }, _sum: { total: true } })
    const planDistribution = await Promise.all(
      ['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'].map(async (plan) => {
        const count = await getDb().business.count({ where: { plan: plan as 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' } })
        return { plan, count }
      }),
    )
    return { totalBusinesses, activeBusinesses, totalSales, totalRevenue: revenue._sum.total ?? 0, planDistribution }
  },
}