import { purchaseOrderRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type PurchaseOrderItemInput = {
  productId: string; quantity: number; unitCost: number; total: number
}

export type CreatePurchaseOrderInput = {
  businessId: string; reference: string; supplierId?: string; createdBy: string
  items: PurchaseOrderItemInput[]
  userId?: string; ip?: string; userAgent?: string
}

export class CreatePurchaseOrderCommand implements ICommand<CreatePurchaseOrderInput, Record<string, unknown>> {
  async execute(input: CreatePurchaseOrderInput) {
    const { userId, ip, userAgent, ...data } = input
    const po = await purchaseOrderRepository.create(data)
    if (userId) {
      await createAuditLog({ userId, action: 'PURCHASE_ORDER_CREATE' as never, entity: 'PurchaseOrder', entityId: po.id, details: `Created purchase order: ${po.reference} - $${po.total}`, ip, userAgent })
    }
    return po
  }
}
