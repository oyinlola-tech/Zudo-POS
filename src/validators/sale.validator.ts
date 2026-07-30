import { z } from 'zod'

const saleItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().min(0),
  discount: z.number().min(0).optional(),
  taxId: z.string().uuid().optional(),
})

const paymentSchema = z.object({
  method: z.enum(['cash', 'card', 'mobile_money', 'crypto', 'credit', 'mixed']),
  amount: z.number().min(0),
  reference: z.string().max(100).transform(v => v.trim()).optional(),
})

export const createSaleSchema = z.object({
  customerId: z.string().uuid().optional(),
  items: z.array(saleItemSchema).min(1, 'At least one item is required'),
  payments: z.array(paymentSchema).min(1, 'At least one payment is required'),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
  discountId: z.string().uuid().optional(),
  shiftId: z.string().uuid(),
})

export const voidSaleSchema = z.object({
  reason: z.string().min(1).max(500).transform(v => v.trim()),
  pin: z.string().length(4).regex(/^\d{4}$/),
})
