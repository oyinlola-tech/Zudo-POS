import bcrypt from 'bcryptjs'
import { shiftRepository } from '../../../repositories/shift.repository.js'
import { userRepository } from '../../../repositories/user.repository.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import { sendBusinessEmail, shiftNotificationTemplate } from '../../../jobs/email-template.util.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type StartShiftInput = {
  userId: string
  pin: string
  startCash: number
  businessId: string
}

export class StartShiftCommand
  implements ICommand<StartShiftInput, { message: string; shiftId: string }>
{
  async execute(input: StartShiftInput) {
    const user = await userRepository.findById(input.userId)
    if (!user) throw new Error('User not found')
    if (!user.pinHash) throw new Error('PIN not set. Please set up your PIN first.')

    const valid = await bcrypt.compare(input.pin, user.pinHash)
    if (!valid) throw new Error('Invalid PIN')

    const active = await shiftRepository.findActiveByUser(input.userId)
    if (active) throw new Error('You already have an active shift. End it first.')

    const shift = await shiftRepository.create({
      userId: input.userId,
      businessId: input.businessId,
      startCash: input.startCash,
    })

    await createAuditLog({
      userId: input.userId,
      action: 'SHIFT_START',
      entityId: shift.id,
    })

    if (user.email) {
      try {
        const html = shiftNotificationTemplate(user.firstName, 'started', { startCash: input.startCash })
        await sendBusinessEmail({
          to: user.email,
          subject: 'Shift started 🚀',
          text: `Hi ${user.firstName}, your shift has started with ₦${input.startCash.toLocaleString()} starting cash.`,
          html,
          businessId: input.businessId,
        })
      } catch { /* email failure ok */ }
    }

    return { message: 'Shift started successfully', shiftId: shift.id }
  }
}