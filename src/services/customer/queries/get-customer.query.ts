import { customerRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetCustomerInput = { id: string; businessId: string }

export class GetCustomerQuery implements IQuery<GetCustomerInput, Record<string, unknown> | null> {
  async execute(input: GetCustomerInput) {
    const c = await customerRepository.findById(input.id, input.businessId)
    if (!c) return null
    return {
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      name: `${c.firstName} ${c.lastName}`,
      email: c.email ?? null,
      phone: c.phone ?? null,
      address: c.address ?? null,
      totalSpent: c.totalSpent,
      visitCount: c.visitCount,
      lastVisit: c.lastVisit ? c.lastVisit.toISOString() : null,
      notes: c.notes ?? null,
      isActive: c.isActive,
      createdAt: c.createdAt.toISOString(),
    }
  }
}