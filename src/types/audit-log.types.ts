export type AuditLogData = {
  id: string; userId: string; action: string; entity?: string | null
  entityId?: string | null; details?: string | null; ip?: string | null
  userAgent?: string | null; createdAt: Date
  user?: { id: string; firstName: string; lastName: string; email: string } | null
}
export type ListAuditLogsOutput = { items: AuditLogData[]; total: number; page: number; limit: number }