import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1).max(200).transform(v => v.trim()),
  description: z.string().max(2000).transform(v => v.trim()).optional(),
  sku: z.string().max(100).transform(v => v.trim()).optional(),
  barcode: z.string().max(100).transform(v => v.trim()).optional(),
  categoryId: z.string().uuid().optional(),
  brand: z.string().max(100).transform(v => v.trim()).optional(),
  unit: z.string().max(50).transform(v => v.trim()).optional(),
  costPrice: z.number().min(0),
  sellingPrice: z.number().min(0),
  wholesalePrice: z.number().min(0).optional(),
  taxId: z.string().uuid().optional(),
  discountId: z.string().uuid().optional(),
  stock: z.number().int().min(0).optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
  trackStock: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

export const updateProductSchema = z.object({
  name: z.string().min(1).max(200).transform(v => v.trim()).optional(),
  description: z.string().max(2000).transform(v => v.trim()).optional(),
  sku: z.string().max(100).transform(v => v.trim()).optional(),
  barcode: z.string().max(100).transform(v => v.trim()).optional(),
  categoryId: z.string().uuid().optional(),
  brand: z.string().max(100).transform(v => v.trim()).optional(),
  unit: z.string().max(50).transform(v => v.trim()).optional(),
  costPrice: z.number().min(0).optional(),
  sellingPrice: z.number().min(0).optional(),
  wholesalePrice: z.number().min(0).optional(),
  taxId: z.string().uuid().optional(),
  discountId: z.string().uuid().optional(),
  stock: z.number().int().min(0).optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
  trackStock: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().transform(v => v.trim()).optional(),
  categoryId: z.string().uuid().optional(),
  brand: z.string().transform(v => v.trim()).optional(),
  isActive: z.enum(['true', 'false']).optional(),
  lowStock: z.enum(['true', 'false']).optional(),
  sortBy: z.enum(['name', 'createdAt', 'sellingPrice', 'stock']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
