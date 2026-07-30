import { taxRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateTaxInput = {
  id: string; businessId: string
  name?: string; rate?: number; type?: string; isActive?: boolean
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateTaxCommand implements ICommand<UpdateTaxInput, Record<string, unknown>> {
  async execute(input: UpdateTaxInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await taxRepository.findById(id)
    if (!existing || existing.businessId !== businessId) throw new Error('Tax not found')
    const tax = await taxRepository.update(id, data as Parameters<typeof taxRepository.update>[1])
    if (userId) {
      await createAuditLog({ userId, action: 'TAX_UPDATE' as never, entity: 'Tax', entityId: id, details: `Updated tax: ${tax.name}`, ip, userAgent })
    }
    return tax
  }
}
