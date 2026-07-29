import { notificationRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetNotificationsQuery implements IQuery<{ userId: string; page?: number; limit?: number }, Record<string, unknown>> {
  async execute(input: { userId: string; page?: number; limit?: number }) {
    return notificationRepository.findByUser(input.userId, { page: input.page, limit: input.limit })
  }
}