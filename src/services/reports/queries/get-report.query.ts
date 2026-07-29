import { getDb } from '../../../databases/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetReportInput = { businessId: string; type: string }

export class GetReportQuery implements IQuery<GetReportInput, Record<string, unknown>> {
  async execute(input: GetReportInput) {
    const now = new Date()
    let startDate: Date

    switch (input.type) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }

    const [sales, revenue, topProducts, transactions] = await Promise.all([
      getDb().sale.count({ where: { businessId: input.businessId, status: 'COMPLETED', createdAt: { gte: startDate } } }),
      getDb().sale.aggregate({ where: { businessId: input.businessId, status: 'COMPLETED', createdAt: { gte: startDate } }, _sum: { total: true } }),
      getDb().saleItem.findMany({
        where: { sale: { businessId: input.businessId, status: 'COMPLETED', createdAt: { gte: startDate } } },
        include: { product: { select: { name: true } } },
        orderBy: { total: 'desc' },
        take: 10,
      }),
      getDb().sale.findMany({
        where: { businessId: input.businessId, status: 'COMPLETED', createdAt: { gte: startDate } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ])

    const topProductsData = topProducts.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      total: item.total,
    }))

    return {
      type: input.type,
      period: { start: startDate.toISOString(), end: now.toISOString() },
      summary: { sales, revenue: revenue._sum.total ?? 0 },
      topProducts: topProductsData,
      transactions,
    }
  }
}
