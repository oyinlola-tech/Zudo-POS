import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetSubscriptionStatsQuery implements IQuery<undefined, Record<string, unknown>> {
  async execute() {
    return billingPlansRepository.getSubscriptionStats()
  }
}