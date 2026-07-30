import { getDb } from '../../../databases/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ExportReportInput = { businessId: string; type: string; format?: string }

export class ExportReportQuery implements IQuery<ExportReportInput, { csv: string }> {
  async execute(input: ExportReportInput) {
    const now = new Date()
    let startDate: Date
    switch (input.type) {
      case 'daily': startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); break
      case 'weekly': startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); break
      case 'monthly': startDate = new Date(now.getFullYear(), now.getMonth(), 1); break
      case 'yearly': startDate = new Date(now.getFullYear(), 0, 1); break
      default: startDate = new Date(0)
    }
    const sales = await getDb().sale.findMany({
      where: { businessId: input.businessId, status: 'COMPLETED', createdAt: { gte: startDate } },
      include: { items: { include: { product: { select: { name: true } } } }, user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    })
    const header = 'reference,date,total,paymentMethod,cashier,items'
    const rows = sales.map(s => {
      const items = s.items.map(i => `${i.product.name}x${i.quantity}`).join('; ')
      return [s.reference, s.createdAt.toISOString(), s.total, s.paymentMethod ?? '', `${s.user.firstName} ${s.user.lastName}`, `"${items}"`].join(',')
    })
    return { csv: [header, ...rows].join('\n') }
  }
}
