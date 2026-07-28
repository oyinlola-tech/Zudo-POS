import bcrypt from 'bcryptjs'
import { BCRYPT_PIN_ROUNDS } from '../../../constants/index.js'
import { userRepository } from '../../../repositories/user.repository.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type SetupPinInput = {
  userId: string
  pin: string
}

export class SetupPinCommand
  implements ICommand<SetupPinInput, { message: string }>
{
  async execute(input: SetupPinInput) {
    const pinHash = await bcrypt.hash(input.pin, BCRYPT_PIN_ROUNDS)
    await userRepository.update(input.userId, { pinHash })
    return { message: 'PIN set successfully' }
  }
}
