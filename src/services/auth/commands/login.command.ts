import bcrypt from 'bcryptjs'
import { userRepository } from '../../../repositories/user.repository.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/service.interface.js'
import type {
  LoginCommandInput,
  LoginCommandOutput,
} from '../../../types/index.js'
import { generateToken, sanitizeUser } from '../../../utils/index.js'

export class LoginCommand
  implements ICommand<LoginCommandInput, LoginCommandOutput>
{
  async execute(input: LoginCommandInput) {
    const user = await userRepository.findByEmail(input.email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash)
    if (!valid) {
      throw new Error('Invalid email or password')
    }

    await userRepository.updateLastLogin(user.id)

    await createAuditLog({
      userId: user.id,
      action: 'LOGIN',
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      businessId: user.businessId,
    })

    return { token, user: sanitizeUser(user) }
  }
}
