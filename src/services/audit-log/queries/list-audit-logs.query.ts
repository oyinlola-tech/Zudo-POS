import { auditLogRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListAuditLogsInput = {
  businessId?: string
  page?: number
  limit?: number
  action?: string
  startDate?: string
  endDate?: string
}

export class ListAuditLogsQuery implements IQuery<ListAuditLogsInput, Record<string, unknown>> {
  async execute(input: ListAuditLogsInput) {
    if (input.businessId) {
      return auditLogRepository.findByBusiness(input.businessId, {
        page: input.page, limit: input.limit,
        action: input.action, startDate: input.startDate, endDate: input.endDate,
      })
    }
    return auditLogRepository.findAll({
      page: input.page, limit: input.limit,
      action: input.action, startDate: input.startDate, endDate: input.endDate,
    })
  }
}