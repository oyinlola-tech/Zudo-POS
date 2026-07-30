import { expenseRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteExpenseInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteExpenseCommand implements ICommand<DeleteExpenseInput, { message: string }> {
  async execute(input: DeleteExpenseInput) {
    const { id, businessId, userId, ip, userAgent } = input
    const expense = await expenseRepository.findById(id)
    if (!expense || expense.businessId !== businessId) throw new Error('Expense not found')
    await expenseRepository.delete(id)
    if (userId) {
      await createAuditLog({ userId, action: 'EXPENSE_DELETE' as never, entity: 'Expense', entityId: id, details: 'Deleted expense', ip, userAgent })
    }
    return { message: 'Expense deleted' }
  }
}
