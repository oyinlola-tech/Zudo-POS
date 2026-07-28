import { sendBusinessEmail, otpTemplate } from '../../../jobs/email-template.util.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type SendOtpMailInput = {
  to: string
  code: string
  type: string
  businessName?: string
  customerName?: string
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
    const bizName = input.businessName ?? 'Zudo POS'
    const html = otpTemplate(input.code, label, input.customerName)
    const text = `Your ${label.toLowerCase()} code is: ${input.code}\n\nThis code expires in 10 minutes.\n\n— ${bizName}`
    await sendBusinessEmail({ to: input.to, subject: `${bizName} — ${label} Code`, text, html })
  }
}