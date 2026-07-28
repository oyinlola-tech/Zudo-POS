import { saleRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type VoidSaleInput = { id: string; userId?: string; ip?: string; userAgent?: string }

export class VoidSaleCommand implements ICommand<VoidSaleInput, { message: string }> {
  async execute(input: VoidSaleInput) {
    const { id, userId, ip, userAgent } = input
    await saleRepository.voidSale(id)
    if (userId) {
      await createAuditLog({ userId, action: 'RETURN', entity: 'Sale', entityId: id, details: 'Sale voided', ip, userAgent })
    }
    return { message: 'Sale voided' }
  }
}