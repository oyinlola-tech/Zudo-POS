import { sendBusinessEmail } from '../../../jobs/email-template.util.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type SendOtpMailInput = {
  to: string
  code: string
  type: string
  businessName?: string
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
    const text = `Your ${label.toLowerCase()} code is: ${input.code}\n\nThis code expires in 10 minutes.\n\n— ${bizName}`
    const html = `
      <h2 style="color: #1b6d24; margin: 0 0 8px;">${label}</h2>
      <p style="color: #374151; font-size: 15px; margin: 0 0 16px;">Your verification code is:</p>
      <div style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #1b6d24; padding: 16px; text-align: center; background: #f0fdf4; border-radius: 8px; margin: 0 0 16px;">${input.code}</div>
      <p style="color: #6b7280; font-size: 14px; margin: 0;">This code expires in 10 minutes.</p>
    `
    await sendBusinessEmail({ to: input.to, subject: `${bizName} — ${label} Code`, text, html })
  }
}