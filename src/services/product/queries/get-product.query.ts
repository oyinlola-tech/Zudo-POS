import { productRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetProductInput = { id: string }

export class GetProductQuery implements IQuery<GetProductInput, Record<string, unknown> | null> {
  async execute(input: GetProductInput) {
    return productRepository.findById(input.id)
  }
}