export type RoleData = { role: string; permissions?: Record<string, boolean> }
export type ListRolesOutput = { roles: string[] }
export type CreateRoleInput = { name: string; permissions?: Record<string, boolean> }