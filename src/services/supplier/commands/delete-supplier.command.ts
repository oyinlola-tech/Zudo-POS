import { supplierRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteSupplierInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteSupplierCommand implements ICommand<DeleteSupplierInput, { message: string }> {
  async execute(input: DeleteSupplierInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const supplier = await supplierRepository.findById(id)
    if (!supplier || supplier.businessId !== businessId) throw new Error('Supplier not found')
    await supplierRepository.delete(id)
    if (userId) {
      await createAuditLog({ userId, action: 'SUPPLIER_DELETE' as never, entity: 'Supplier', entityId: id, details: 'Deleted supplier', ip, userAgent })
    }
    return { message: 'Supplier deleted' }
  }
}
