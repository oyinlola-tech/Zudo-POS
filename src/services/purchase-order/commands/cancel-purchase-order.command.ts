import { purchaseOrderRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CancelPurchaseOrderInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class CancelPurchaseOrderCommand implements ICommand<CancelPurchaseOrderInput, Record<string, unknown>> {
  async execute(input: CancelPurchaseOrderInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const po = await purchaseOrderRepository.findById(id)
    if (!po || po.businessId !== businessId) throw new Error('Purchase order not found')
    if (po.status === 'RECEIVED' || po.status === 'CANCELLED') throw new Error('Purchase order cannot be cancelled')
    const updated = await purchaseOrderRepository.cancel(id)
    if (userId) {
      await createAuditLog({ userId, action: 'PURCHASE_ORDER_CANCEL' as never, entity: 'PurchaseOrder', entityId: id, details: `Cancelled purchase order: ${po.reference}`, ip, userAgent })
    }
    return updated
  }
}
