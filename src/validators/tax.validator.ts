import { z } from 'zod'

export const createTaxSchema = z.object({
  name: z.string().min(1).max(100).transform(v => v.trim()),
  rate: z.number().min(0).max(100),
  type: z.enum(['percentage', 'fixed']),
  description: z.string().max(500).transform(v => v.trim()).optional(),
  isActive: z.boolean().optional(),
})

export const updateTaxSchema = z.object({
  name: z.string().min(1).max(100).transform(v => v.trim()).optional(),
  rate: z.number().min(0).max(100).optional(),
  type: z.enum(['percentage', 'fixed']).optional(),
  description: z.string().max(500).transform(v => v.trim()).optional(),
  isActive: z.boolean().optional(),
})
