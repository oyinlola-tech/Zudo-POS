import { getDb } from '../databases/index.js'

export const returnsRepository = {
  async processReturn(data: {
    saleId: string; businessId: string; userId: string; reason?: string
  }) {
    return getDb().$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({
        where: { id: data.saleId },
        include: { items: true },
      })
      if (!sale) throw new Error('Sale not found')
      if (sale.businessId !== data.businessId) throw new Error('Unauthorized')
      if (sale.status !== 'COMPLETED') throw new Error('Sale cannot be returned')

      for (const item of sale.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        })
      }

      if (sale.customerId) {
        const pointsDeduct = Math.floor(sale.total / 100)
        const customer = await tx.customer.findUnique({ where: { id: sale.customerId } })
        const newPoints = Math.max(0, (customer?.points ?? 0) - pointsDeduct)
        await tx.customer.update({
          where: { id: sale.customerId },
          data: {
            totalSpent: { decrement: sale.total },
            visitCount: { decrement: 1 },
            points: newPoints,
          },
        })
      }

      return tx.sale.update({
        where: { id: data.saleId },
        data: { status: 'REFUNDED', notes: data.reason ?? null },
      })
    })
  },

  async findByBusiness(businessId: string, options?: { page?: number; limit?: number }) {
    const where = { businessId, status: 'REFUNDED' as const }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().sale.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { items: { include: { product: true } } },
      }),
      getDb().sale.count({ where }),
    ])
    return { items, total, page, limit }
  },

  async findById(id: string) {
    return getDb().sale.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    })
  },

  async updateStatus(id: string, status: string) {
    return getDb().sale.update({ where: { id }, data: { status: status as never } })
  },
}