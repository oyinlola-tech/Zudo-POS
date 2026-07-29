import { superadminRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetRevenueStatsQuery implements IQuery<undefined, Record<string, unknown>> {
  async execute() {
    return superadminRepository.getRevenueStats()
  }
}