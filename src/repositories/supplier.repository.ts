import { getDb } from '../databases/index.js'

export const supplierRepository = {
  async create(data: { businessId: string; name: string; contactName?: string; email?: string; phone?: string; address?: string }) {
    return getDb().supplier.create({ data })
  },

  async update(id: string, data: { name?: string; contactName?: string; email?: string; phone?: string; address?: string }) {
    return getDb().supplier.update({ where: { id }, data })
  },

  async delete(id: string) {
    return getDb().supplier.update({ where: { id }, data: { isActive: false } })
  },

  async findById(id: string) {
    return getDb().supplier.findUnique({ where: { id } })
  },

  async findByBusiness(businessId: string, options?: { page?: number; limit?: number }) {
    const where = { businessId, isActive: true }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().supplier.findMany({ where, orderBy: { name: 'asc' }, skip: (page - 1) * limit, take: limit }),
      getDb().supplier.count({ where }),
    ])
    return { items, total, page, limit }
  },
}
