import { returnsRepository, saleRepository, customerRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type ProcessReturnInput = {
  saleId: string; businessId: string; userId: string; reason?: string
  ip?: string; userAgent?: string
}

export class ProcessReturnCommand implements ICommand<ProcessReturnInput, Record<string, unknown>> {
  async execute(input: ProcessReturnInput) {
    const { ip, userAgent, ...data } = input
    const result = await returnsRepository.processReturn(data)
    await createAuditLog({
      userId: data.userId,
      action: 'RETURN',
      entity: 'Sale',
      entityId: data.saleId,
      details: `Return processed for sale ${data.saleId}${data.reason ? ` — ${data.reason}` : ''}`,
      ip,
      userAgent,
    })
    return result
  }
}