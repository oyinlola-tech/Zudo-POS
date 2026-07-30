import { supplierRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListSuppliersInput = { businessId: string; page?: number; limit?: number }

export class ListSuppliersQuery implements IQuery<ListSuppliersInput, Record<string, unknown>> {
  async execute(input: ListSuppliersInput) {
    const { businessId, ...options } = input
    const result = await supplierRepository.findByBusiness(businessId, options)
    return {
      ...result,
      items: result.items.map((s: Record<string, unknown>) => ({
        id: s['id'],
        businessId: s['businessId'],
        name: s['name'],
        contactName: s['contactName'] ?? null,
        email: s['email'] ?? null,
        phone: s['phone'] ?? null,
        address: s['address'] ?? null,
        isActive: s['isActive'] ?? true,
        createdAt: new Date(s['createdAt'] as string).toISOString(),
        updatedAt: new Date(s['updatedAt'] as string).toISOString(),
      })),
    }
  }
}
