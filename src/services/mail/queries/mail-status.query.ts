import type { IQuery } from '../../../interfaces/service.interface.js'

export type MailStatusInput = { messageId: string }

export class MailStatusQuery implements IQuery<MailStatusInput, { sent: boolean }> {
  async execute(_input: MailStatusInput): Promise<{ sent: boolean }> {
    return { sent: true }
  }
}