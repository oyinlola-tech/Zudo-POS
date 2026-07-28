import { saleRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetSaleInput = { id: string }

export class GetSaleQuery implements IQuery<GetSaleInput, Record<string, unknown> | null> {
  async execute(input: GetSaleInput) {
    return saleRepository.findById(input.id)
  }
}