import { staffRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListStaffInput = { businessId: string; search?: string; page?: number; limit?: number }

export class ListStaffQuery implements IQuery<ListStaffInput, Record<string, unknown>> {
  async execute(input: ListStaffInput) {
    const { businessId, ...options } = input
    const result = await staffRepository.findByBusiness(businessId, options)
    return {
      ...result,
      items: result.items.map((s: Record<string, unknown>) => ({
        id: s['id'],
        firstName: s['firstName'],
        lastName: s['lastName'],
        name: `${s['firstName']} ${s['lastName']}`,
        email: s['email'],
        role: s['role'],
        isActive: s['isActive'],
        phone: s['phone'] ?? null,
        lastLoginAt: s['lastLoginAt'] ? new Date(s['lastLoginAt'] as string).toISOString() : null,
        createdAt: new Date(s['createdAt'] as string).toISOString(),
      })),
    }
  }
}