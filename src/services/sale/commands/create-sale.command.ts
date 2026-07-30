import { saleRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { pointsEarnedTemplate } from '../../../jobs/email-template.util.js'
import { getDb } from '../../../databases/index.js'
import { queue } from '../../../cores/index.js'
import { paymentApi } from '../../../apis/index.js'
import type { ICommand } from '../../../interfaces/index.js'

type SaleItemInput = { productId: string; quantity: number; unitPrice: number; total: number }

export type CreateSaleInput = {
  businessId: string; userId: string; shiftId?: string; customerId?: string
  subtotal: number; discount?: number; tax?: number; total: number
  paymentMethod?: string; paymentReference?: string; notes?: string
  items: SaleItemInput[]
  ip?: string; userAgent?: string
}

export class CreateSaleCommand implements ICommand<CreateSaleInput, Record<string, unknown>> {
  async execute(input: CreateSaleInput) {
    const { ip, userAgent, paymentReference, ...data } = input

    if (paymentReference) {
      try {
        await paymentApi.verifyTransaction(paymentReference)
      } catch {
        throw new Error('Payment verification failed')
      }
    }

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
          const totalPoints = (customer.points ?? 0) + pointsEarned
          const html = pointsEarnedTemplate(customer.firstName, data.total, pointsEarned, totalPoints, sale.reference)
          queue.enqueue('send-email', {
            to: customer.email,
            subject: `You earned ${pointsEarned} points! 🎉`,
            text: `Hi ${customer.firstName}, thank you for your purchase of ₦${data.total.toLocaleString()}! You earned ${pointsEarned} points. Total balance: ${totalPoints.toLocaleString()}. Receipt: ${sale.reference}`,
            html,
            businessId: data.businessId,
          })
        }
      } catch {
        // Queue failure should not block sale
      }
    }

    return sale
  }
}