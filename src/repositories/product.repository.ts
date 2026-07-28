import { getDb } from '../databases/index.js'

export const productRepository = {
  async findByBusiness(businessId: string, options?: { category?: string; search?: string; page?: number; limit?: number }) {
    const where: Record<string, unknown> = { businessId, isActive: true }
    if (options?.category) where['category'] = options.category
    if (options?.search) {
      where['OR'] = [
        { name: { contains: options.search } },
        { sku: { contains: options.search } },
        { barcode: { contains: options.search } },
      ]
    }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      getDb().product.count({ where }),
    ])
    return { items, total, page, limit }
  },

  async findById(id: string) {
    return getDb().product.findUnique({ where: { id } })
  },

  async create(data: { businessId: string; name: string; price: number; sku?: string; barcode?: string; description?: string; costPrice?: number; stock?: number; lowStockQty?: number; category?: string; image?: string }) {
    return getDb().product.create({ data })
  },

  async update(id: string, data: Record<string, unknown>) {
    return getDb().product.update({ where: { id }, data })
  },

  async remove(id: string) {
    return getDb().product.update({ where: { id }, data: { isActive: false } })
  },

  async getInventoryStats(businessId: string) {
    const [total, lowStock, outOfStock] = await Promise.all([
      getDb().product.count({ where: { businessId, isActive: true } }),
      getDb().product.count({ where: { businessId, isActive: true, stock: { lte: getDb().product.fields.lowStockQty }, NOT: { stock: 0 } } }),
      getDb().product.count({ where: { businessId, isActive: true, stock: 0 } }),
    ])
    return { total, lowStock, outOfStock }
  },
}