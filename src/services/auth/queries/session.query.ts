import { userRepository } from '../../../repositories/user.repository.js'
import type { IQuery } from '../../../interfaces/service.interface.js'
import { verifyToken, sanitizeUser } from '../../../utils/index.js'

export type GetSessionInput = { token: string }

export class GetSessionQuery
  implements IQuery<GetSessionInput, Record<string, unknown> | null>
{
  async execute(input: GetSessionInput) {
    try {
      const payload = verifyToken(input.token)
      const user = await userRepository.findById(payload.userId)
      if (!user) return null
      return sanitizeUser(user)
    } catch {
      return null
    }
  }
}
