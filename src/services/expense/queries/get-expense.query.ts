import { expenseRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetExpenseInput = { id: string; businessId: string }

export class GetExpenseQuery implements IQuery<GetExpenseInput, Record<string, unknown> | null> {
  async execute(input: GetExpenseInput) {
    const e = await expenseRepository.findById(input.id)
    if (!e || e.businessId !== input.businessId) return null
    return {
      id: e.id,
      businessId: e.businessId,
      category: e.category,
      amount: e.amount,
      description: e.description ?? null,
      reference: e.reference ?? null,
      createdBy: e.createdBy,
      date: e.date ? e.date.toISOString() : null,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }
  }
}
