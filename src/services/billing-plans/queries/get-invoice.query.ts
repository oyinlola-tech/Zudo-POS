import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetInvoiceQuery implements IQuery<{ invoiceId: string }, Record<string, unknown>> {
  async execute(input: { invoiceId: string }) {
    return billingPlansRepository.getInvoice(input.invoiceId)
  }
}