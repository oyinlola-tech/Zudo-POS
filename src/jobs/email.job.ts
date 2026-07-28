import nodemailer from 'nodemailer'
import { smtpConfig } from '../constants/smtp.constant.js'
import { logger } from '../cores/logger/index.js'

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter

  if (!smtpConfig.user || !smtpConfig.pass) {
    logger.warn('SMTP credentials not configured — emails will be logged to console')
    return null
  }

  transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: { user: smtpConfig.user, pass: smtpConfig.pass },
  })

  return transporter
}

export async function sendEmail(options: {
  to: string
  subject: string
  text: string
  html?: string
}): Promise<void> {
  const t = getTransporter()

  if (!t) {
    logger.info(`[EMAIL LOG] To: ${options.to} | Subject: ${options.subject} | Body: ${options.text}`)
    return
  }

  try {
    await t.sendMail({
      from: smtpConfig.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })
    logger.info(`Email sent to ${options.to}`)
  } catch (err) {
    logger.error(`Failed to send email to ${options.to}`, err)
  }
}

export async function sendOtpEmail(
  to: string,
  code: string,
  type: string,
): Promise<void> {
  const typeLabels: Record<string, string> = {
    password_reset: 'Password Reset',
    pin_reset: 'PIN Reset',
    pin_change: 'PIN Change',
    email_verification: 'Email Verification',
  }

  const label = typeLabels[type] || 'Verification'
  const subject = `Zudo POS — ${label} Code`

  const text = `Your ${label.toLowerCase()} code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, please ignore this email.\n\n— Zudo POS Team`

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #1b6d24;">Zudo POS</h2>
      <h3>${label}</h3>
      <p>Your verification code is:</p>
      <div style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #1b6d24; padding: 16px; text-align: center; background: #f0fdf4; border-radius: 8px;">${code}</div>
      <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
    </div>
  `

  await sendEmail({ to, subject, text, html })
}
