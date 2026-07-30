import { supplierRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateSupplierInput = {
  id: string; businessId: string
  name?: string; contactName?: string; email?: string; phone?: string; address?: string
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateSupplierCommand implements ICommand<UpdateSupplierInput, Record<string, unknown>> {
  async execute(input: UpdateSupplierInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await supplierRepository.findById(id)
    if (!existing || existing.businessId !== businessId) throw new Error('Supplier not found')
    const supplier = await supplierRepository.update(id, data)
    if (userId) {
      await createAuditLog({ userId, action: 'SUPPLIER_UPDATE' as never, entity: 'Supplier', entityId: id, details: `Updated supplier: ${supplier.name}`, ip, userAgent })
    }
    return supplier
  }
}
