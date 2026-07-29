import { loyaltyRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateTierInput = { id: string; businessId: string; tier: string }

export class UpdateTierCommand implements ICommand<UpdateTierInput, Record<string, unknown>> {
  async execute(input: UpdateTierInput) {
    const member = await loyaltyRepository.findById(input.id, input.businessId)
    if (!member) throw new Error('Loyalty member not found')
    return loyaltyRepository.updateTier(input.id, input.businessId, input.tier)
  }
}
