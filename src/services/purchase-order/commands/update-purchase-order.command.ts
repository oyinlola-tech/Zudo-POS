import { purchaseOrderRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdatePurchaseOrderInput = {
  id: string; businessId: string
  reference?: string; supplierId?: string
  userId?: string; ip?: string; userAgent?: string
}

export class UpdatePurchaseOrderCommand implements ICommand<UpdatePurchaseOrderInput, Record<string, unknown>> {
  async execute(input: UpdatePurchaseOrderInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const po = await purchaseOrderRepository.findById(id)
    if (!po || po.businessId !== businessId) throw new Error('Purchase order not found')
    if (userId) {
      await createAuditLog({ userId, action: 'PURCHASE_ORDER_UPDATE' as never, entity: 'PurchaseOrder', entityId: id, details: `Updated purchase order: ${po.reference}`, ip, userAgent })
    }
    return po
  }
}
