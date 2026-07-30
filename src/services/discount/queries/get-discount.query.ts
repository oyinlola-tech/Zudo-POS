import { discountRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetDiscountInput = { id: string; businessId: string }

export class GetDiscountQuery implements IQuery<GetDiscountInput, Record<string, unknown> | null> {
  async execute(input: GetDiscountInput) {
    const d = await discountRepository.findById(input.id)
    if (!d || d.businessId !== input.businessId) return null
    return {
      id: d.id,
      businessId: d.businessId,
      name: d.name,
      type: d.type,
      value: d.value,
      minPurchase: d.minPurchase ?? null,
      isActive: d.isActive,
      startsAt: d.startsAt ? d.startsAt.toISOString() : null,
      endsAt: d.endsAt ? d.endsAt.toISOString() : null,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    }
  }
}
