import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type InvoiceData = { businessId: string; amount: number; description: string }

export class GenerateInvoiceCommand implements ICommand<InvoiceData, { invoiceId: string }> {
  async execute(input: InvoiceData) {
    const invoice = await getDb().businessSetting.create({
      data: {
        businessId: input.businessId,
        key: `invoice_${Date.now()}`,
        value: JSON.stringify({
          amount: input.amount,
          description: input.description,
          date: new Date().toISOString(),
        }),
      },
    })
    return { invoiceId: invoice.id }
  }
}