import { userRepository } from '../../../repositories/user.repository.js'
import type { IQuery } from '../../../interfaces/service.interface.js'
import { sanitizeUser } from '../../../utils/index.js'

export type GetProfileInput = { userId: string }

export class GetProfileQuery
  implements IQuery<GetProfileInput, Record<string, unknown> | null>
{
  async execute(input: GetProfileInput) {
    const user = await userRepository.findById(input.userId)
    if (!user) return null
    return sanitizeUser(user)
  }
}
