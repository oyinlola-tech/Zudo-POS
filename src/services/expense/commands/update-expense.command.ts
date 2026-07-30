import { expenseRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateExpenseInput = {
  id: string; businessId: string
  category?: string; amount?: number; description?: string; reference?: string
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateExpenseCommand implements ICommand<UpdateExpenseInput, Record<string, unknown>> {
  async execute(input: UpdateExpenseInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await expenseRepository.findById(id)
    if (!existing || existing.businessId !== businessId) throw new Error('Expense not found')
    const expense = await expenseRepository.update(id, data)
    if (userId) {
      await createAuditLog({ userId, action: 'EXPENSE_UPDATE' as never, entity: 'Expense', entityId: id, details: `Updated expense: ${expense.category} - $${expense.amount}`, ip, userAgent })
    }
    return expense
  }
}
