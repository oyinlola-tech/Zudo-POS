import { saleRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListSalesInput = { businessId: string; page?: number; limit?: number; status?: string }

export class ListSalesQuery implements IQuery<ListSalesInput, Record<string, unknown>> {
  async execute(input: ListSalesInput) {
    return saleRepository.findByBusiness(input.businessId, input)
  }
}