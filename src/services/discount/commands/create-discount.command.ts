import { discountRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateDiscountInput = {
  businessId: string; name: string; type: string; value: number
  minPurchase?: number; startsAt?: Date; endsAt?: Date
  userId?: string; ip?: string; userAgent?: string
}

export class CreateDiscountCommand implements ICommand<CreateDiscountInput, Record<string, unknown>> {
  async execute(input: CreateDiscountInput) {
    const { userId, ip, userAgent, ...data } = input
    const discount = await discountRepository.create(data as Parameters<typeof discountRepository.create>[0])
    if (userId) {
      await createAuditLog({ userId, action: 'DISCOUNT_CREATE' as never, entity: 'Discount', entityId: discount.id, details: `Created discount: ${discount.name} (${discount.type})`, ip, userAgent })
    }
    return discount
  }
}
