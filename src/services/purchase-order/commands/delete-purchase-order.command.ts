import { purchaseOrderRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeletePurchaseOrderInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeletePurchaseOrderCommand implements ICommand<DeletePurchaseOrderInput, { message: string }> {
  async execute(input: DeletePurchaseOrderInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const po = await purchaseOrderRepository.findById(id)
    if (!po || po.businessId !== businessId) throw new Error('Purchase order not found')
    await purchaseOrderRepository.cancel(id)
    if (userId) {
      await createAuditLog({ userId, action: 'PURCHASE_ORDER_DELETE' as never, entity: 'PurchaseOrder', entityId: id, details: 'Deleted purchase order', ip, userAgent })
    }
    return { message: 'Purchase order deleted' }
  }
}
