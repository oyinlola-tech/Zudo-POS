import { customerRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteCustomerInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteCustomerCommand implements ICommand<DeleteCustomerInput, { message: string }> {
  async execute(input: DeleteCustomerInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const customer = await customerRepository.findById(id, businessId)
    if (!customer) throw new Error('Customer not found')
    await customerRepository.remove(id)
    if (userId) {
      await createAuditLog({ userId, action: 'CUSTOMER_DELETE', entity: 'Customer', entityId: id, details: 'Deleted customer', ip, userAgent })
    }
    return { message: 'Customer deleted' }
  }
}
