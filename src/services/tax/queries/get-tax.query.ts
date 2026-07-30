import { taxRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetTaxInput = { id: string; businessId: string }

export class GetTaxQuery implements IQuery<GetTaxInput, Record<string, unknown> | null> {
  async execute(input: GetTaxInput) {
    const t = await taxRepository.findById(input.id)
    if (!t || t.businessId !== input.businessId) return null
    return {
      id: t.id,
      businessId: t.businessId,
      name: t.name,
      rate: t.rate,
      type: t.type ?? null,
      isActive: t.isActive,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }
  }
}
