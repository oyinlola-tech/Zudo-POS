import { sendBusinessEmail } from '../../../jobs/email-template.util.js'
import type { ICommand } from '../../../interfaces/index.js'

export type SendCustomEmailInput = { to: string; subject: string; text: string; html?: string }

export class SendCustomEmailCommand implements ICommand<SendCustomEmailInput, { message: string }> {
  async execute(input: SendCustomEmailInput) {
    await sendBusinessEmail({ to: input.to, subject: input.subject, text: input.text, html: input.html ?? '' })
    return { message: 'Email sent' }
  }
}
