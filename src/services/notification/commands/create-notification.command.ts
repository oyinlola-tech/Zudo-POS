import { notificationRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export class CreateNotificationCommand implements ICommand<{ userId: string; title: string; message: string; type?: string }, Record<string, unknown>> {
  async execute(input: { userId: string; title: string; message: string; type?: string }) {
    return notificationRepository.create(input.userId, { title: input.title, message: input.message, type: input.type })
  }
}