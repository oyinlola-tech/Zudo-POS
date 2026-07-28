import { returnsRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListReturnsInput = { businessId: string; page?: number; limit?: number }

export class ListReturnsQuery implements IQuery<ListReturnsInput, Record<string, unknown>> {
  async execute(input: ListReturnsInput) {
    return returnsRepository.findByBusiness(input.businessId, { page: input.page, limit: input.limit })
  }
}