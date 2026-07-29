import { notificationRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetBroadcastHistoryQuery implements IQuery<{ businessId: string }, Record<string, unknown>> {
  async execute(input: { businessId: string }) {
    return notificationRepository.getBroadcastHistory(input.businessId)
  }
}