import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class ListInvoicesQuery implements IQuery<{ businessId: string; page?: number; limit?: number }, Record<string, unknown>> {
  async execute(input: { businessId: string; page?: number; limit?: number }) {
    return billingPlansRepository.listInvoices(input.businessId, { page: input.page, limit: input.limit })
  }
}