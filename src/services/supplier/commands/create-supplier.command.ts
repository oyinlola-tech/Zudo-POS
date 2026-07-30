import { supplierRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateSupplierInput = {
  businessId: string; name: string
  contactName?: string; email?: string; phone?: string; address?: string
  userId?: string; ip?: string; userAgent?: string
}

export class CreateSupplierCommand implements ICommand<CreateSupplierInput, Record<string, unknown>> {
  async execute(input: CreateSupplierInput) {
    const { userId, ip, userAgent, ...data } = input
    const supplier = await supplierRepository.create(data)
    if (userId) {
      await createAuditLog({ userId, action: 'SUPPLIER_CREATE' as never, entity: 'Supplier', entityId: supplier.id, details: `Created supplier: ${supplier.name}`, ip, userAgent })
    }
    return supplier
  }
}
