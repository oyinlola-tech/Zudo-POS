import { notificationRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export class BroadcastNotificationCommand implements ICommand<{ businessId: string; title: string; message: string; type?: string }, Record<string, unknown>> {
  async execute(input: { businessId: string; title: string; message: string; type?: string }) {
    return notificationRepository.broadcast(input.businessId, { title: input.title, message: input.message, type: input.type })
  }
}
