import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListInvoicesInput = { businessId: string; page?: number; limit?: number }

export class ListInvoicesQuery implements IQuery<ListInvoicesInput, Record<string, unknown>> {
  async execute(input: ListInvoicesInput) {
    return billingPlansRepository.listInvoices(input.businessId, { page: input.page, limit: input.limit })
  }
}
