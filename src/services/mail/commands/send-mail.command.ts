import { sendEmail } from '../../../jobs/email.job.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type SendOtpMailInput = {
  to: string
  code: string
  type: string
}

export class SendOtpMailCommand implements ICommand<SendOtpMailInput, void> {
  async execute(input: SendOtpMailInput): Promise<void> {
    const typeLabels: Record<string, string> = {
      password_reset: 'Password Reset',
      pin_reset: 'PIN Reset',
      pin_change: 'PIN Change',
      email_verification: 'Email Verification',
    }
    const label = typeLabels[input.type] || 'Verification'
    const text = `Your ${label.toLowerCase()} code is: ${input.code}\n\nThis code expires in 10 minutes.`
    await sendEmail({
      to: input.to,
      subject: `Zudo POS — ${label} Code`,
      text,
    })
  }
}