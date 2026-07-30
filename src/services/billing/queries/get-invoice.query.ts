import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetInvoiceInput = { invoiceId: string }

export class GetInvoiceQuery implements IQuery<GetInvoiceInput, Record<string, unknown>> {
  async execute(input: GetInvoiceInput) {
    return billingPlansRepository.getInvoice(input.invoiceId)
  }
}
