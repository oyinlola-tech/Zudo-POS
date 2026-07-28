import { saleRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type SaleStatsInput = { businessId: string }

export class GetSaleStatsQuery implements IQuery<SaleStatsInput, Record<string, unknown>> {
  async execute(input: SaleStatsInput) {
    return saleRepository.getStats(input.businessId)
  }
}