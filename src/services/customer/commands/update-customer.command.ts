import { customerRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateCustomerInput = {
  id: string; businessId: string
  firstName?: string; lastName?: string; email?: string
  phone?: string; address?: string; notes?: string
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateCustomerCommand implements ICommand<UpdateCustomerInput, Record<string, unknown>> {
  async execute(input: UpdateCustomerInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await customerRepository.findById(id, businessId)
    if (!existing) throw new Error('Customer not found')
    const customer = await customerRepository.update(id, businessId, data)
    if (userId) {
      await createAuditLog({ userId, action: 'CUSTOMER_UPDATE', entity: 'Customer', entityId: id, details: `Updated customer: ${customer.firstName} ${customer.lastName}`, ip, userAgent })
    }
    return customer
  }
}