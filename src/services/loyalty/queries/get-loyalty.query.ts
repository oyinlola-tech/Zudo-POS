import { loyaltyRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetLoyaltyInput = { id: string; businessId: string }

export class GetLoyaltyQuery implements IQuery<GetLoyaltyInput, Record<string, unknown> | null> {
  async execute(input: GetLoyaltyInput) {
    return loyaltyRepository.findById(input.id, input.businessId)
  }
}
