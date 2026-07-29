import { saleRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetSaleInput = { id: string; businessId: string }

export class GetSaleQuery implements IQuery<GetSaleInput, Record<string, unknown> | null> {
  async execute(input: GetSaleInput) {
    const sale = await saleRepository.findById(input.id)
    if (!sale || sale.businessId !== input.businessId) return null
    return sale
  }
}