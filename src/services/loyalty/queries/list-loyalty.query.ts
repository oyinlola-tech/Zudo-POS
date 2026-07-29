import { loyaltyRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListLoyaltyInput = {
  businessId: string
  tier?: string
  search?: string
  page?: number
  limit?: number
}

export class ListLoyaltyQuery implements IQuery<ListLoyaltyInput, Record<string, unknown>> {
  async execute(input: ListLoyaltyInput) {
    return loyaltyRepository.findByBusiness(input.businessId, {
      tier: input.tier, search: input.search,
      page: input.page, limit: input.limit,
    })
  }
}
