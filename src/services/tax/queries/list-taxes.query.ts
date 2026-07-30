import { taxRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListTaxesInput = { businessId: string }

export class ListTaxesQuery implements IQuery<ListTaxesInput, Record<string, unknown>> {
  async execute(input: ListTaxesInput) {
    const items = await taxRepository.findByBusiness(input.businessId)
    return {
      items: items.map((t: Record<string, unknown>) => ({
        id: t['id'],
        businessId: t['businessId'],
        name: t['name'],
        rate: t['rate'],
        type: t['type'] ?? null,
        isActive: t['isActive'] ?? true,
        createdAt: new Date(t['createdAt'] as string).toISOString(),
        updatedAt: new Date(t['updatedAt'] as string).toISOString(),
      })),
    }
  }
}
