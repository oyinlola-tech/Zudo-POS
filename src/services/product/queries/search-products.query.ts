import { productRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type SearchProductsInput = { businessId: string; q: string }

export class SearchProductsQuery implements IQuery<SearchProductsInput, Record<string, unknown>> {
  async execute(input: SearchProductsInput) {
    return productRepository.findByBusiness(input.businessId, { search: input.q })
  }
}