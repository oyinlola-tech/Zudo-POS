import { expenseRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateExpenseInput = {
  businessId: string; category: string; amount: number
  description?: string; reference?: string; createdBy: string
  userId?: string; ip?: string; userAgent?: string
}

export class CreateExpenseCommand implements ICommand<CreateExpenseInput, Record<string, unknown>> {
  async execute(input: CreateExpenseInput) {
    const { userId, ip, userAgent, ...data } = input
    const expense = await expenseRepository.create(data)
    if (userId) {
      await createAuditLog({ userId, action: 'EXPENSE_CREATE' as never, entity: 'Expense', entityId: expense.id, details: `Created expense: ${expense.category} - $${expense.amount}`, ip, userAgent })
    }
    return expense
  }
}
