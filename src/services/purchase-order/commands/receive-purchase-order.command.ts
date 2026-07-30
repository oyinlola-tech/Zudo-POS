import { purchaseOrderRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type ReceivePurchaseOrderInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class ReceivePurchaseOrderCommand implements ICommand<ReceivePurchaseOrderInput, Record<string, unknown>> {
  async execute(input: ReceivePurchaseOrderInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const po = await purchaseOrderRepository.findById(id)
    if (!po || po.businessId !== businessId) throw new Error('Purchase order not found')
    if (po.status !== 'PENDING') throw new Error('Purchase order is not in PENDING status')
    const updated = await purchaseOrderRepository.receive(id)
    if (userId) {
      await createAuditLog({ userId, action: 'PURCHASE_ORDER_RECEIVE' as never, entity: 'PurchaseOrder', entityId: id, details: `Received purchase order: ${po.reference}`, ip, userAgent })
    }
    return updated
  }
}
