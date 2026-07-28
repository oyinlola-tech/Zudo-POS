import bcrypt from 'bcryptjs'
import { BCRYPT_ROUNDS } from '../../../constants/index.js'
import { userRepository } from '../../../repositories/user.repository.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type ChangePasswordInput = {
  userId: string
  currentPassword: string
  newPassword: string
}

export class ChangePasswordCommand
  implements ICommand<ChangePasswordInput, { message: string }>
{
  async execute(input: ChangePasswordInput) {
    const user = await userRepository.findById(input.userId)
    if (!user) throw new Error('User not found')

    const valid = await bcrypt.compare(input.currentPassword, user.passwordHash)
    if (!valid) throw new Error('Current password is incorrect')

    const passwordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS)
    await userRepository.update(input.userId, { passwordHash })

    await createAuditLog({
      userId: input.userId,
      action: 'PASSWORD_CHANGE',
    })

    return { message: 'Password changed successfully' }
  }
}
