import { z } from 'zod'

const purchaseOrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().min(0),
})

export const createPurchaseOrderSchema = z.object({
  supplierId: z.string().uuid(),
  items: z.array(purchaseOrderItemSchema).min(1, 'At least one item is required'),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
  expectedDate: z.string().datetime().optional(),
  shippingCost: z.number().min(0).optional(),
  taxId: z.string().uuid().optional(),
})

export const receivePurchaseOrderSchema = z.object({
  purchaseOrderId: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantityReceived: z.number().int().min(0),
  })).min(1, 'At least one item is required'),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
})
