import { customerRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { sendBusinessEmail, welcomeTemplate } from '../../../jobs/email-template.util.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateCustomerInput = {
  businessId: string; firstName: string; lastName: string
  email?: string; phone?: string; address?: string; notes?: string
  userId?: string; ip?: string; userAgent?: string
}

export class CreateCustomerCommand implements ICommand<CreateCustomerInput, Record<string, unknown>> {
  async execute(input: CreateCustomerInput) {
    const { userId, ip, userAgent, ...data } = input
    if (data.email) {
      const existing = await customerRepository.findByEmail(data.businessId, data.email)
      if (existing) throw new Error('Customer with this email already exists')
    }
    const customer = await customerRepository.create(data)

    if (userId) {
      await createAuditLog({ userId, action: 'CUSTOMER_CREATE', entity: 'Customer', entityId: customer.id, details: `Created customer: ${customer.firstName} ${customer.lastName}`, ip, userAgent })
    }

    if (customer.email) {
      try {
        const html = welcomeTemplate(customer.firstName, customer.lastName)
        await sendBusinessEmail({
          to: customer.email,
          subject: `Welcome to your loyalty program, ${customer.firstName}! 🎉`,
          text: `Welcome ${customer.firstName} ${customer.lastName}! Your account has been created. You can earn points on every purchase.`,
          html,
          businessId: data.businessId,
        })
      } catch {
        // Email failure should not block creation
      }
    }

    return customer
  }
}