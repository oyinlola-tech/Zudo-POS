import { customerRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { sendBusinessEmail } from '../../../jobs/email-template.util.js'
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
        const html = `
          <p style="color: #374151; font-size: 15px; margin: 0 0 8px;">Welcome, <strong>${customer.firstName} ${customer.lastName}</strong>!</p>
          <p style="color: #374151; font-size: 15px; margin: 0 0 16px;">Your account has been created successfully. You can now earn points on every purchase and redeem them for rewards.</p>
          <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; text-align: center; margin: 0 0 16px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Your Balance</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1b6d24;">0 points</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">We look forward to serving you!</p>
        `
        await sendBusinessEmail({
          to: customer.email,
          subject: 'Welcome! Your account is ready',
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