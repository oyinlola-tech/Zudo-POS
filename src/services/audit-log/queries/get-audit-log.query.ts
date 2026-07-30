import { auditLogRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetAuditLogInput = { id: string }

export class GetAuditLogQuery implements IQuery<GetAuditLogInput, Record<string, unknown> | null> {
  async execute(input: GetAuditLogInput) {
    return auditLogRepository.findById(input.id)
  }
}
