import { customerRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListCustomersInput = { businessId: string; search?: string; page?: number; limit?: number }

export class ListCustomersQuery implements IQuery<ListCustomersInput, Record<string, unknown>> {
  async execute(input: ListCustomersInput) {
    const { businessId, ...options } = input
    const result = await customerRepository.findByBusiness(businessId, options)
    return {
      ...result,
      items: result.items.map((c: Record<string, unknown>) => ({
        id: c['id'],
        firstName: c['firstName'],
        lastName: c['lastName'],
        name: `${c['firstName']} ${c['lastName']}`,
        email: c['email'] ?? null,
        phone: c['phone'] ?? null,
        address: c['address'] ?? null,
        totalSpent: c['totalSpent'] ?? 0,
        visitCount: c['visitCount'] ?? 0,
        lastVisit: c['lastVisit'] ? new Date(c['lastVisit'] as string).toISOString() : null,
        notes: c['notes'] ?? null,
        isActive: c['isActive'] ?? true,
        createdAt: new Date(c['createdAt'] as string).toISOString(),
      })),
    }
  }
}