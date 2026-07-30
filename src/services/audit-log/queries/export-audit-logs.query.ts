import { auditLogRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ExportAuditLogsInput = { businessId?: string; action?: string; startDate?: string; endDate?: string }

export class ExportAuditLogsQuery implements IQuery<ExportAuditLogsInput, { csv: string }> {
  async execute(input: ExportAuditLogsInput) {
    const data = input.businessId
      ? await auditLogRepository.findByBusiness(input.businessId, { action: input.action, startDate: input.startDate, endDate: input.endDate, limit: 10000 })
      : await auditLogRepository.findAll({ action: input.action, startDate: input.startDate, endDate: input.endDate, limit: 10000 })
    const header = 'id,action,entity,entityId,details,userId,createdAt'
    const rows = data.items.map((r: Record<string, unknown>) => {
      const details = String(r.details ?? '')
      return [r.id, r.action, r.entity, r.entityId, `"${details.replace(/"/g, '""')}"`, r.userId, r.createdAt].join(',')
    })
    return { csv: [header, ...rows].join('\n') }
  }
}
