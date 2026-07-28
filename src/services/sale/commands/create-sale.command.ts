import { saleRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

type SaleItemInput = { productId: string; quantity: number; unitPrice: number; total: number }

export type CreateSaleInput = {
  businessId: string; userId: string; shiftId?: string
  subtotal: number; discount?: number; tax?: number; total: number
  paymentMethod?: string; notes?: string
  items: SaleItemInput[]
  ip?: string; userAgent?: string
}

export class CreateSaleCommand implements ICommand<CreateSaleInput, Record<string, unknown>> {
  async execute(input: CreateSaleInput) {
    const { ip, userAgent, ...data } = input
    const sale = await saleRepository.create(data)
    await createAuditLog({
      userId: data.userId,
      action: 'SALE',
      entity: 'Sale',
      entityId: sale.id,
      details: `Sale ${sale.reference} — ₦${data.total.toLocaleString()}`,
      ip,
      userAgent,
    })
    return sale
  }
}