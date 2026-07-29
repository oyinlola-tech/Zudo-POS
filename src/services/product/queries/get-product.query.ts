import { productRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetProductInput = { id: string; businessId: string }

export class GetProductQuery implements IQuery<GetProductInput, Record<string, unknown> | null> {
  async execute(input: GetProductInput) {
    const product = await productRepository.findById(input.id)
    if (!product || product.businessId !== input.businessId) return null
    return product
  }
}