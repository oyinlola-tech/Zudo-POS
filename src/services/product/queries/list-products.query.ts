import { productRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListProductsInput = { businessId: string; category?: string; search?: string; page?: number; limit?: number }

export class ListProductsQuery implements IQuery<ListProductsInput, Record<string, unknown>> {
  async execute(input: ListProductsInput) {
    return productRepository.findByBusiness(input.businessId, input)
  }
}