import { notificationRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export class MarkNotificationReadCommand implements ICommand<{ notificationId: string }, Record<string, unknown>> {
  async execute(input: { notificationId: string }) {
    return notificationRepository.markRead(input.notificationId)
  }
}