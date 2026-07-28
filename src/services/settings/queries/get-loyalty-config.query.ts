import { settingsRepository } from '../../../repositories/index.js'
import { getDb } from '../../../databases/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetLoyaltyConfigInput = { businessId: string }

export class GetLoyaltyConfigQuery implements IQuery<GetLoyaltyConfigInput, Record<string, unknown>> {
  async execute(input: GetLoyaltyConfigInput) {
    const all = await settingsRepository.getAll(input.businessId)
    const loyaltyKeys = Object.keys(all).filter(k => k.startsWith('loyalty_'))
    const config: Record<string, string> = {}
    for (const key of loyaltyKeys) {
      config[key.replace('loyalty_', '')] = all[key] ?? ''
    }
    return Object.keys(config).length > 0
      ? config
      : { pointsPerAmount: '100', signupBonus: '50', rewardThreshold: '500' }
  }
}

export class GetLoyaltyActivityQuery implements IQuery<GetLoyaltyConfigInput, Record<string, unknown>> {
  async execute(input: GetLoyaltyConfigInput) {
    const logs = await getDb().auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return { items: logs }
  }
}