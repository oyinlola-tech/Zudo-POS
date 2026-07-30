import { getDb } from '../databases/index.js'

const ROLES = ['OWNER', 'ADMIN', 'MANAGER', 'CASHIER', 'SUPERADMIN'] as const

export const rolesRepository = {
  async listRoles() {
    return { roles: ROLES }
  },

  async createRole(data: { name: string; permissions?: Record<string, boolean> }) {
    const normalized = data.name.toUpperCase().replace(/\s+/g, '_')
    if (ROLES.includes(normalized as never)) {
      throw new Error(`Role '${normalized}' already exists`)
    }
    return { role: normalized, permissions: data.permissions ?? {} }
  },

  async getRole(role: string) {
    const exists = ROLES.includes(role as never)
    if (!exists) return null
    return { role, permissions: {} }
  },

  async updateRole(roleId: string, data: Record<string, unknown>) {
    return { role: roleId, ...data }
  },

  async getUsersByRole(businessId: string, role: string) {
    return getDb().user.findMany({
      where: { businessId, role: role as never, isActive: true },
      select: { id: true, firstName: true, lastName: true, email: true },
    })
  },
}