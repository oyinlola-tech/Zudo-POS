import { getDb } from '../databases/index.js'

export const purchaseOrderRepository = {
  async create(data: {
    businessId: string; reference: string; supplierId?: string; createdBy: string
    items: { productId: string; quantity: number; unitCost: number; total: number }[]
  }) {
    return getDb().$transaction(async (tx) => {
      const total = data.items.reduce((sum, i) => sum + i.total, 0)
      const po = await tx.purchaseOrder.create({
        data: {
          businessId: data.businessId,
          reference: data.reference,
          supplierId: data.supplierId,
          createdBy: data.createdBy,
          total,
          items: { create: data.items },
        },
        include: { items: true },
      })
      return po
    })
  },

  async receive(id: string) {
    return getDb().$transaction(async (tx) => {
      const po = await tx.purchaseOrder.update({
        where: { id }, data: { status: 'RECEIVED', receivedAt: new Date() },
        include: { items: true },
      })
      for (const item of po.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        })
      }
      return po
    })
  },

  async cancel(id: string) {
    return getDb().purchaseOrder.update({ where: { id }, data: { status: 'CANCELLED' } })
  },

  async findById(id: string) {
    return getDb().purchaseOrder.findUnique({ where: { id }, include: { items: true, supplier: true } })
  },

  async findByBusiness(businessId: string, options?: { page?: number; limit?: number; status?: string }) {
    const where: Record<string, unknown> = { businessId }
    if (options?.status) where['status'] = options.status
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().purchaseOrder.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit, include: { items: true, supplier: { select: { name: true } } } }),
      getDb().purchaseOrder.count({ where }),
    ])
    return { items, total, page, limit }
  },
}
