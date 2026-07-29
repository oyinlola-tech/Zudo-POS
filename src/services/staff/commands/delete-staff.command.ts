import { staffRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteStaffInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteStaffCommand implements ICommand<DeleteStaffInput, { message: string }> {
  async execute(input: DeleteStaffInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const staff = await staffRepository.findById(id, businessId)
    if (!staff) throw new Error('Staff not found')
    await staffRepository.remove(id)
    if (userId) {
      await createAuditLog({ userId, action: 'USER_DELETE', entity: 'User', entityId: id, details: 'Deleted staff user', ip, userAgent })
    }
    return { message: 'Staff deleted' }
  }
}
