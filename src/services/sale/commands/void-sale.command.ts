import { saleRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type VoidSaleInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class VoidSaleCommand implements ICommand<VoidSaleInput, { message: string }> {
  async execute(input: VoidSaleInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const sale = await saleRepository.findById(id)
    if (!sale || sale.businessId !== businessId) throw new Error('Sale not found')
    await saleRepository.voidSale(id)
    if (userId) {
      await createAuditLog({ userId, action: 'RETURN', entity: 'Sale', entityId: id, details: 'Sale voided', ip, userAgent })
    }
    return { message: 'Sale voided' }
  }
}