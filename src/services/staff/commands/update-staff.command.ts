import { userRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateStaffInput = {
  id: string; businessId: string
  firstName?: string; lastName?: string; email?: string
  role?: string; isActive?: boolean; phone?: string
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateStaffCommand implements ICommand<UpdateStaffInput, Record<string, unknown>> {
  async execute(input: UpdateStaffInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await userRepository.findById(id)
    if (!existing || existing.businessId !== businessId) throw new Error('Staff not found')

    const staff = await userRepository.update(id, data as Record<string, unknown>)
    if (userId) {
      await createAuditLog({ userId, action: 'USER_UPDATE', entity: 'Staff', entityId: id, details: `Updated staff: ${staff.firstName} ${staff.lastName}`, ip, userAgent })
    }

    const { passwordHash: _, pinHash: __, ...safe } = staff
    return safe
  }
}