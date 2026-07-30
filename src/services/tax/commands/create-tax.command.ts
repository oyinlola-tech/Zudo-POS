import { taxRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateTaxInput = {
  businessId: string; name: string; rate: number; type?: string
  userId?: string; ip?: string; userAgent?: string
}

export class CreateTaxCommand implements ICommand<CreateTaxInput, Record<string, unknown>> {
  async execute(input: CreateTaxInput) {
    const { userId, ip, userAgent, ...data } = input
    const tax = await taxRepository.create(data as Parameters<typeof taxRepository.create>[0])
    if (userId) {
      await createAuditLog({ userId, action: 'TAX_CREATE' as never, entity: 'Tax', entityId: tax.id, details: `Created tax: ${tax.name} (${tax.rate}%)`, ip, userAgent })
    }
    return tax
  }
}
