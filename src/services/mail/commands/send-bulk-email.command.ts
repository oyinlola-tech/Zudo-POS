import { sendBusinessEmail } from '../../../jobs/email-template.util.js'
import type { ICommand } from '../../../interfaces/index.js'

export type SendBulkEmailInput = { recipients: string[]; subject: string; text: string; html?: string }

export class SendBulkEmailCommand implements ICommand<SendBulkEmailInput, { sent: number }> {
  async execute(input: SendBulkEmailInput) {
    const results = await Promise.allSettled(
      input.recipients.map(to => sendBusinessEmail({ to, subject: input.subject, text: input.text, html: input.html ?? '' })),
    )
    return { sent: results.filter(r => r.status === 'fulfilled').length }
  }
}
