import { supplierRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetSupplierInput = { id: string; businessId: string }

export class GetSupplierQuery implements IQuery<GetSupplierInput, Record<string, unknown> | null> {
  async execute(input: GetSupplierInput) {
    const s = await supplierRepository.findById(input.id)
    if (!s || s.businessId !== input.businessId) return null
    return {
      id: s.id,
      businessId: s.businessId,
      name: s.name,
      contactName: s.contactName ?? null,
      email: s.email ?? null,
      phone: s.phone ?? null,
      address: s.address ?? null,
      isActive: s.isActive,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }
  }
}
