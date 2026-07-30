import { getDb } from '../../../databases/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type AuditLogStatsInput = { businessId?: string; startDate?: string; endDate?: string }

export class AuditLogStatsQuery implements IQuery<AuditLogStatsInput, Record<string, unknown>> {
  async execute(input: AuditLogStatsInput) {
    const where: Record<string, unknown> = {}
    if (input.businessId) where['user'] = { businessId: input.businessId }
    if (input.startDate || input.endDate) {
      const createdAt: Record<string, Date> = {}
      if (input.startDate) createdAt['gte'] = new Date(input.startDate)
      if (input.endDate) createdAt['lte'] = new Date(input.endDate)
      where['createdAt'] = createdAt
    }
    const [total, byAction, recent] = await Promise.all([
      getDb().auditLog.count({ where }),
      getDb().auditLog.groupBy({ by: ['action'], where, _count: true, orderBy: { _count: { action: 'desc' } } }),
      getDb().auditLog.findMany({ where, orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { firstName: true, lastName: true, email: true } } } }),
    ])
    return { total, byAction: byAction.map(a => ({ action: a.action, count: a._count })), recent }
  }
}
