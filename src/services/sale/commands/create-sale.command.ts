import { saleRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { sendBusinessEmail } from '../../../jobs/email-template.util.js'
import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/index.js'

type SaleItemInput = { productId: string; quantity: number; unitPrice: number; total: number }

export type CreateSaleInput = {
  businessId: string; userId: string; shiftId?: string; customerId?: string
  subtotal: number; discount?: number; tax?: number; total: number
  paymentMethod?: string; notes?: string
  items: SaleItemInput[]
  ip?: string; userAgent?: string
}

export class CreateSaleCommand implements ICommand<CreateSaleInput, Record<string, unknown>> {
  async execute(input: CreateSaleInput) {
    const { ip, userAgent, ...data } = input
    const sale = await saleRepository.create(data)

    await createAuditLog({
      userId: data.userId,
      action: 'SALE',
      entity: 'Sale',
      entityId: sale.id,
      details: `Sale ${sale.reference} — ₦${data.total.toLocaleString()}`,
      ip,
      userAgent,
    })

    if (data.customerId) {
      try {
        const customer = await getDb().customer.findUnique({ where: { id: data.customerId } })
        if (customer?.email) {
          const pointsEarned = Math.floor(data.total / 100)
          const html = `
            <p style="color: #374151; font-size: 15px; margin: 0 0 8px;">Hi <strong>${customer.firstName}</strong>,</p>
            <p style="color: #374151; font-size: 15px; margin: 0 0 16px;">Thank you for your purchase of <strong style="color: #1b6d24;">₦${data.total.toLocaleString()}</strong>!</p>
            <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; text-align: center; margin: 0 0 16px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Points Earned</p>
              <p style="margin: 0; font-size: 36px; font-weight: bold; color: #1b6d24;">+${pointsEarned}</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Total Balance: <strong>${(customer.points + pointsEarned).toLocaleString()}</strong></p>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Receipt Ref: ${sale.reference}</p>
          `
          await sendBusinessEmail({
            to: customer.email,
            subject: 'You earned points!',
            text: `Hi ${customer.firstName}, thank you for your purchase of ₦${data.total.toLocaleString()}! You earned ${pointsEarned} points. Total balance: ${(customer.points + pointsEarned).toLocaleString()}. Receipt: ${sale.reference}`,
            html,
            businessId: data.businessId,
          })
        }
      } catch {
        // Email failure should not block sale
      }
    }

    return sale
  }
}