import { z } from 'zod'

export const updateSettingsSchema = z.object({
  businessName: z.string().min(1).max(200).transform(v => v.trim()).optional(),
  businessEmail: z.string().email().max(255).transform(v => v.toLowerCase().trim()).optional(),
  businessPhone: z.string().max(20).transform(v => v.trim()).optional(),
  businessAddress: z.string().max(500).transform(v => v.trim()).optional(),
  currency: z.string().length(3).transform(v => v.toUpperCase().trim()).optional(),
  timezone: z.string().max(100).transform(v => v.trim()).optional(),
  dateFormat: z.string().max(20).transform(v => v.trim()).optional(),
  taxRate: z.number().min(0).max(100).optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
  receiptFooter: z.string().max(500).transform(v => v.trim()).optional(),
  enableLoyalty: z.boolean().optional(),
  enableMultiCurrency: z.boolean().optional(),
  defaultLanguage: z.string().length(2).transform(v => v.toLowerCase().trim()).optional(),
})

export const listSettingsQuerySchema = z.object({
  group: z.string().transform(v => v.trim()).optional(),
})
