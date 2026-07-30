import { z } from 'zod'

const returnItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  reason: z.string().max(500).transform(v => v.trim()),
})

export const processReturnSchema = z.object({
  saleId: z.string().uuid(),
  items: z.array(returnItemSchema).min(1, 'At least one item is required'),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
  refundAmount: z.number().min(0),
  refundMethod: z.enum(['cash', 'card', 'mobile_money', 'credit']),
})

export const approveReturnSchema = z.object({
  returnId: z.string().uuid(),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
})

export const rejectReturnSchema = z.object({
  returnId: z.string().uuid(),
  reason: z.string().min(1).max(500).transform(v => v.trim()),
})
