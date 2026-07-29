import { notificationRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetUnreadCountQuery implements IQuery<{ userId: string }, Record<string, unknown>> {
  async execute(input: { userId: string }) {
    return notificationRepository.getUnreadCount(input.userId)
  }
}