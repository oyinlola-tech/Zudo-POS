import { productRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type InventoryStatsInput = { businessId: string }

export class GetInventoryStatsQuery implements IQuery<InventoryStatsInput, Record<string, unknown>> {
  async execute(input: InventoryStatsInput) {
    return productRepository.getInventoryStats(input.businessId)
  }
}