import { discountRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListDiscountsInput = { businessId: string }

export class ListDiscountsQuery implements IQuery<ListDiscountsInput, Record<string, unknown>> {
  async execute(input: ListDiscountsInput) {
    const items = await discountRepository.findByBusiness(input.businessId)
    return {
      items: items.map((d: Record<string, unknown>) => ({
        id: d['id'],
        businessId: d['businessId'],
        name: d['name'],
        type: d['type'],
        value: d['value'],
        minPurchase: d['minPurchase'] ?? null,
        isActive: d['isActive'] ?? true,
        startsAt: d['startsAt'] ? new Date(d['startsAt'] as string).toISOString() : null,
        endsAt: d['endsAt'] ? new Date(d['endsAt'] as string).toISOString() : null,
        createdAt: new Date(d['createdAt'] as string).toISOString(),
        updatedAt: new Date(d['updatedAt'] as string).toISOString(),
      })),
    }
  }
}
