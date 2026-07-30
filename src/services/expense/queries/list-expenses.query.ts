import { expenseRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListExpensesInput = { businessId: string; category?: string; page?: number; limit?: number }

export class ListExpensesQuery implements IQuery<ListExpensesInput, Record<string, unknown>> {
  async execute(input: ListExpensesInput) {
    const { businessId, ...options } = input
    const result = await expenseRepository.findByBusiness(businessId, options)
    return {
      ...result,
      items: result.items.map((e: Record<string, unknown>) => ({
        id: e['id'],
        businessId: e['businessId'],
        category: e['category'],
        amount: e['amount'],
        description: e['description'] ?? null,
        reference: e['reference'] ?? null,
        createdBy: e['createdBy'],
        date: e['date'] ? new Date(e['date'] as string).toISOString() : null,
        createdAt: new Date(e['createdAt'] as string).toISOString(),
        updatedAt: new Date(e['updatedAt'] as string).toISOString(),
      })),
    }
  }
}
