import { notificationRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export class MarkAllNotificationsReadCommand implements ICommand<{ userId: string }, Record<string, unknown>> {
  async execute(input: { userId: string }) {
    return notificationRepository.markAllRead(input.userId)
  }
}