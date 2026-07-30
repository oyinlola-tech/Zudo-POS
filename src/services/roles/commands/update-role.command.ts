import { rolesRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateRoleInput = { roleId: string; permissions?: string[]; description?: string; userId?: string; ip?: string; userAgent?: string }

export class UpdateRoleCommand implements ICommand<UpdateRoleInput, Record<string, unknown>> {
  async execute(input: UpdateRoleInput) {
    const { roleId, userId, ip, userAgent, ...data } = input
    const result = await rolesRepository.updateRole(roleId, data)
    if (userId) {
      await createAuditLog({ userId, action: 'USER_UPDATE', entity: 'Role', entityId: roleId, details: `Role updated: ${roleId}`, ip, userAgent })
    }
    return result
  }
}
