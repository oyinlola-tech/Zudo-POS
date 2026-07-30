import { purchaseOrderRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListPurchaseOrdersInput = { businessId: string; status?: string; page?: number; limit?: number }

export class ListPurchaseOrdersQuery implements IQuery<ListPurchaseOrdersInput, Record<string, unknown>> {
  async execute(input: ListPurchaseOrdersInput) {
    const { businessId, ...options } = input
    const result = await purchaseOrderRepository.findByBusiness(businessId, options)
    return {
      ...result,
      items: result.items.map((po: Record<string, unknown>) => ({
        id: po['id'],
        businessId: po['businessId'],
        reference: po['reference'],
        supplierId: po['supplierId'] ?? null,
        supplier: po['supplier'] ?? null,
        status: po['status'],
        total: po['total'],
        createdBy: po['createdBy'],
        receivedAt: po['receivedAt'] ? new Date(po['receivedAt'] as string).toISOString() : null,
        items: po['items'] ?? [],
        createdAt: new Date(po['createdAt'] as string).toISOString(),
        updatedAt: new Date(po['updatedAt'] as string).toISOString(),
      })),
    }
  }
}
