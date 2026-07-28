import { analyticsRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type BranchPerformanceInput = { businessId: string }

export class BranchPerformanceQuery implements IQuery<BranchPerformanceInput, Record<string, unknown>> {
  async execute(input: BranchPerformanceInput) {
    const items = await analyticsRepository.getBranchPerformance(input.businessId)
    return { items }
  }
}