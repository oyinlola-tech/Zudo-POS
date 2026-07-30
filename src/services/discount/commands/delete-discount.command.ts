import { discountRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteDiscountInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteDiscountCommand implements ICommand<DeleteDiscountInput, { message: string }> {
  async execute(input: DeleteDiscountInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const discount = await discountRepository.findById(id)
    if (!discount || discount.businessId !== businessId) throw new Error('Discount not found')
    await discountRepository.delete(id)
    if (userId) {
      await createAuditLog({ userId, action: 'DISCOUNT_DELETE' as never, entity: 'Discount', entityId: id, details: 'Deleted discount', ip, userAgent })
    }
    return { message: 'Discount deleted' }
  }
}
