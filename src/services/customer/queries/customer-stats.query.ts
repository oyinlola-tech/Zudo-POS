import { customerRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type CustomerStatsInput = { businessId: string }

export class CustomerStatsQuery implements IQuery<CustomerStatsInput, Record<string, unknown>> {
  async execute(input: CustomerStatsInput) {
    return customerRepository.getStats(input.businessId)
  }
}