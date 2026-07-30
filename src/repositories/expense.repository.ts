import { getDb } from '../databases/index.js'

export const expenseRepository = {
  async create(data: { businessId: string; category: string; amount: number; description?: string; reference?: string; createdBy: string }) {
    return getDb().expense.create({ data })
  },

  async update(id: string, data: { category?: string; amount?: number; description?: string; reference?: string }) {
    return getDb().expense.update({ where: { id }, data })
  },

  async delete(id: string) {
    return getDb().expense.delete({ where: { id } })
  },

  async findById(id: string) {
    return getDb().expense.findUnique({ where: { id } })
  },

  async findByBusiness(businessId: string, options?: { page?: number; limit?: number; category?: string }) {
    const where: Record<string, unknown> = { businessId }
    if (options?.category) where['category'] = options.category
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().expense.findMany({ where, orderBy: { date: 'desc' }, skip: (page - 1) * limit, take: limit }),
      getDb().expense.count({ where }),
    ])
    return { items, total, page, limit }
  },
}
