import bcrypt from 'bcryptjs'
import { BCRYPT_PIN_ROUNDS } from '../../../constants/index.js'
import { userRepository } from '../../../repositories/user.repository.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type ChangePinInput = {
  userId: string
  currentPin: string
  newPin: string
}

export class ChangePinCommand
  implements ICommand<ChangePinInput, { message: string }>
{
  async execute(input: ChangePinInput) {
    const user = await userRepository.findById(input.userId)
    if (!user) throw new Error('User not found')

    if (user.pinHash) {
      const valid = await bcrypt.compare(input.currentPin, user.pinHash)
      if (!valid) throw new Error('Current PIN is incorrect')
    }

    const pinHash = await bcrypt.hash(input.newPin, BCRYPT_PIN_ROUNDS)
    await userRepository.update(input.userId, { pinHash })

    await createAuditLog({
      userId: input.userId,
      action: 'PIN_CHANGE',
    })

    return { message: 'PIN changed successfully' }
  }
}
