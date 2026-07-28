import { analyticsRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type DashboardInput = { businessId: string }

export class DashboardQuery implements IQuery<DashboardInput, Record<string, unknown>> {
  async execute(input: DashboardInput) {
    return analyticsRepository.getDashboard(input.businessId)
  }
}