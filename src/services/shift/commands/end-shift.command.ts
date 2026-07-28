import bcrypt from 'bcryptjs'
import { shiftRepository } from '../../../repositories/shift.repository.js'
import { userRepository } from '../../../repositories/user.repository.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { sendBusinessEmail, shiftNotificationTemplate } from '../../../jobs/email-template.util.js'
import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type EndShiftInput = {
  userId: string
  pin: string
  endCash: number
  notes?: string
}

export class EndShiftCommand
  implements ICommand<EndShiftInput, { message: string; shiftId: string }>
{
  async execute(input: EndShiftInput) {
    const user = await userRepository.findById(input.userId)
    if (!user) throw new Error('User not found')
    if (!user.pinHash) throw new Error('PIN not set')

    const valid = await bcrypt.compare(input.pin, user.pinHash)
    if (!valid) throw new Error('Invalid PIN')

    const active = await shiftRepository.findActiveByUser(input.userId)
    if (!active) throw new Error('No active shift found')

    const closed = await shiftRepository.close(active.id, input.endCash, input.notes)

    await createAuditLog({
      userId: input.userId,
      action: 'SHIFT_END',
      entityId: active.id,
      details: `End cash: ${input.endCash}, Diff: ${closed.cashDiff}`,
    })

    const salesCount = await getDb().sale.count({ where: { shiftId: active.id } })
if (user.email) {
      try {
        const html = shiftNotificationTemplate(user.firstName, 'ended', {
          startCash: active.startCash,
          endCash: input.endCash,
          cashDiff: closed.cashDiff ?? 0,
          salesCount,
        })
        await sendBusinessEmail({
          to: user.email,
          subject: 'Shift ended 🏁',
          text: `Hi ${user.firstName}, your shift has ended. Cash: ₦${input.endCash.toLocaleString()}, Diff: ₦${(closed.cashDiff ?? 0).toLocaleString()}.`,
          html,
          businessId: user.businessId,
        })
      } catch { /* email failure ok */ }
    }

    return { message: 'Shift ended successfully', shiftId: active.id }
  }
}