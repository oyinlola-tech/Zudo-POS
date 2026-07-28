import { z } from 'zod'

export const billingPlanSchema = z.object({
  plan: z.enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE']),
})

export const invoiceSchema = z.object({
  businessId: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().min(1),
})