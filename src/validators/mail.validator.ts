import { z } from 'zod'

export const sendOtpMailSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  type: z.enum(['password_reset', 'pin_reset', 'email_verification', 'login']),
})

export const sendCustomEmailSchema = z.object({
  to: z.string().email().transform(v => v.toLowerCase().trim()),
  subject: z.string().min(1).max(255).transform(v => v.trim()),
  body: z.string().min(1).max(10000).transform(v => v.trim()),
  cc: z.string().email().transform(v => v.toLowerCase().trim()).optional(),
  bcc: z.string().email().transform(v => v.toLowerCase().trim()).optional(),
})

export const sendBulkEmailSchema = z.object({
  recipients: z.array(z.string().email().transform(v => v.toLowerCase().trim())).min(1).max(500),
  subject: z.string().min(1).max(255).transform(v => v.trim()),
  body: z.string().min(1).max(10000).transform(v => v.trim()),
})
