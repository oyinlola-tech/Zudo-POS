import { getDb } from '../../../databases/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteRoleInput = { roleId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteRoleCommand implements ICommand<DeleteRoleInput, { message: string }> {
  async execute(input: DeleteRoleInput) {
    const { roleId, userId, ip, userAgent } = input
    const usersWithRole = await getDb().user.count({ where: { role: roleId as never } })
    if (usersWithRole > 0) throw new Error(`Cannot delete role "${roleId}": ${usersWithRole} users have it`)
    if (userId) {
      await createAuditLog({ userId, action: 'USER_UPDATE', entity: 'Role', entityId: roleId, details: `Role deleted: ${roleId}`, ip, userAgent })
    }
    return { message: `Role ${roleId} removed` }
  }
}
