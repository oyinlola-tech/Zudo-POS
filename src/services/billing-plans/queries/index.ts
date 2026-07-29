import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class ListPlansQuery implements IQuery<undefined, Record<string, unknown>> {
  async execute() {
    return billingPlansRepository.listPlans()
  }
}

export class GetPlanQuery implements IQuery<{ planId: string }, Record<string, unknown>> {
  async execute(input: { planId: string }) {
    return billingPlansRepository.getPlan(input.planId)
  }
}

export class ListInvoicesQuery implements IQuery<{ businessId: string; page?: number; limit?: number }, Record<string, unknown>> {
  async execute(input: { businessId: string; page?: number; limit?: number }) {
    return billingPlansRepository.listInvoices(input.businessId, { page: input.page, limit: input.limit })
  }
}

export class GetInvoiceQuery implements IQuery<{ invoiceId: string }, Record<string, unknown>> {
  async execute(input: { invoiceId: string }) {
    return billingPlansRepository.getInvoice(input.invoiceId)
  }
}

export class GetSubscriptionStatsQuery implements IQuery<undefined, Record<string, unknown>> {
  async execute() {
    return billingPlansRepository.getSubscriptionStats()
  }
}