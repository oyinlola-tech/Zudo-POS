import { purchaseOrderRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetPurchaseOrderInput = { id: string; businessId: string }

export class GetPurchaseOrderQuery implements IQuery<GetPurchaseOrderInput, Record<string, unknown> | null> {
  async execute(input: GetPurchaseOrderInput) {
    const po = await purchaseOrderRepository.findById(input.id)
    if (!po || po.businessId !== input.businessId) return null
    return {
      id: po.id,
      businessId: po.businessId,
      reference: po.reference,
      supplierId: po.supplierId ?? null,
      supplier: po.supplier ?? null,
      status: po.status,
      total: po.total,
      createdBy: po.createdBy,
      receivedAt: po.receivedAt ? po.receivedAt.toISOString() : null,
      items: po.items.map((i: Record<string, unknown>) => ({
        id: i['id'],
        productId: i['productId'],
        quantity: i['quantity'],
        unitCost: i['unitCost'],
        total: i['total'],
      })),
      createdAt: po.createdAt.toISOString(),
      updatedAt: po.updatedAt.toISOString(),
    }
  }
}
