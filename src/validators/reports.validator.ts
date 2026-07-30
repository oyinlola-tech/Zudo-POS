import { z } from 'zod'

export const getReportQuerySchema = z.object({
  type: z.enum(['sales', 'products', 'customers', 'staff', 'tax', 'profit_loss', 'inventory', 'expenses']),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly', 'custom']).optional(),
  format: z.enum(['json', 'csv', 'pdf']).optional(),
})

export const scheduleReportSchema = z.object({
  type: z.enum(['sales', 'products', 'customers', 'staff', 'tax', 'profit_loss', 'inventory', 'expenses']),
  period: z.enum(['daily', 'weekly', 'monthly']),
  recipients: z.array(z.string().email().transform(v => v.toLowerCase().trim())).min(1).max(20),
  format: z.enum(['json', 'csv', 'pdf']),
})
