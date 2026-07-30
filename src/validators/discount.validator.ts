import { z } from 'zod'

export const createDiscountSchema = z.object({
  name: z.string().min(1).max(100).transform(v => v.trim()),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0),
  description: z.string().max(500).transform(v => v.trim()).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minPurchase: z.number().min(0).optional(),
  maxUses: z.number().int().min(0).optional(),
  applicableProducts: z.array(z.string().uuid()).optional(),
  applicableCategories: z.array(z.string().uuid()).optional(),
  isActive: z.boolean().optional(),
})

export const updateDiscountSchema = z.object({
  name: z.string().min(1).max(100).transform(v => v.trim()).optional(),
  type: z.enum(['percentage', 'fixed']).optional(),
  value: z.number().min(0).optional(),
  description: z.string().max(500).transform(v => v.trim()).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minPurchase: z.number().min(0).optional(),
  maxUses: z.number().int().min(0).optional(),
  applicableProducts: z.array(z.string().uuid()).optional(),
  applicableCategories: z.array(z.string().uuid()).optional(),
  isActive: z.boolean().optional(),
})
