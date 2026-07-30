import { taxRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteTaxInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteTaxCommand implements ICommand<DeleteTaxInput, { message: string }> {
  async execute(input: DeleteTaxInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const tax = await taxRepository.findById(id)
    if (!tax || tax.businessId !== businessId) throw new Error('Tax not found')
    await taxRepository.delete(id)
    if (userId) {
      await createAuditLog({ userId, action: 'TAX_DELETE' as never, entity: 'Tax', entityId: id, details: 'Deleted tax', ip, userAgent })
    }
    return { message: 'Tax deleted' }
  }
}
