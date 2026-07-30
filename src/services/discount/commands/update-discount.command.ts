import { discountRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateDiscountInput = {
  id: string; businessId: string
  name?: string; type?: string; value?: number
  minPurchase?: number; isActive?: boolean; startsAt?: Date; endsAt?: Date
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateDiscountCommand implements ICommand<UpdateDiscountInput, Record<string, unknown>> {
  async execute(input: UpdateDiscountInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await discountRepository.findById(id)
    if (!existing || existing.businessId !== businessId) throw new Error('Discount not found')
    const discount = await discountRepository.update(id, data as Parameters<typeof discountRepository.update>[1])
    if (userId) {
      await createAuditLog({ userId, action: 'DISCOUNT_UPDATE' as never, entity: 'Discount', entityId: id, details: `Updated discount: ${discount.name}`, ip, userAgent })
    }
    return discount
  }
}
