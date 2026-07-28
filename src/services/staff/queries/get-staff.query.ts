import { staffRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetStaffInput = { id: string; businessId: string }

export class GetStaffQuery implements IQuery<GetStaffInput, Record<string, unknown> | null> {
  async execute(input: GetStaffInput) {
    const s = await staffRepository.findById(input.id, input.businessId)
    if (!s) return null
    return {
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      name: `${s.firstName} ${s.lastName}`,
      email: s.email,
      role: s.role,
      isActive: s.isActive,
      phone: s.phone ?? null,
      lastLoginAt: s.lastLoginAt ? s.lastLoginAt.toISOString() : null,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }
  }
}