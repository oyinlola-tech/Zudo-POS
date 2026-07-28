import { saleRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { sendEmail } from '../../../jobs/email.job.js'
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
            <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto;">
              <h2 style="color: #1b6d24;">Zudo POS</h2>
              <p>Hi ${customer.firstName},</p>
              <p>Thank you for your purchase of <strong>₦${data.total.toLocaleString()}</strong>!</p>
              <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; text-align: center; margin: 16px 0;">
                <p style="margin: 0; color: #666; font-size: 14px;">Points Earned</p>
                <p style="margin: 0; font-size: 36px; font-weight: bold; color: #1b6d24;">+${pointsEarned}</p>
                <p style="margin: 0; color: #666; font-size: 14px;">Total Balance: <strong>${(customer.points + pointsEarned).toLocaleString()}</strong></p>
              </div>
              <p style="color: #666; font-size: 14px;">Receipt Ref: ${sale.reference}</p>
              <hr style="border: none; border-top: 1px solid #eee;" />
              <p style="color: #999; font-size: 12px;">— Zudo POS Team</p>
            </div>
          `
          await sendEmail({
            to: customer.email,
            subject: 'You earned points! — Zudo POS',
            text: `Hi ${customer.firstName}, thank you for your purchase of ₦${data.total.toLocaleString()}! You earned ${pointsEarned} points. Total balance: ${(customer.points + pointsEarned).toLocaleString()}. Receipt: ${sale.reference}`,
            html,
          })
        }
      } catch {
        // Email failure should not block sale
      }
    }

    return sale
  }
}