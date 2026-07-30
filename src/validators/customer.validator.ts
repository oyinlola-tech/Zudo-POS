import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string().min(1).max(200).transform(v => v.trim()),
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()).optional(),
  phone: z.string().max(20).transform(v => v.trim()).optional(),
  address: z.string().max(500).transform(v => v.trim()).optional(),
  city: z.string().max(100).transform(v => v.trim()).optional(),
  state: z.string().max(100).transform(v => v.trim()).optional(),
  postalCode: z.string().max(20).transform(v => v.trim()).optional(),
  country: z.string().max(100).transform(v => v.trim()).optional(),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
  creditLimit: z.number().min(0).optional(),
  taxId: z.string().max(50).transform(v => v.trim()).optional(),
})

export const updateCustomerSchema = z.object({
  name: z.string().min(1).max(200).transform(v => v.trim()).optional(),
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()).optional(),
  phone: z.string().max(20).transform(v => v.trim()).optional(),
  address: z.string().max(500).transform(v => v.trim()).optional(),
  city: z.string().max(100).transform(v => v.trim()).optional(),
  state: z.string().max(100).transform(v => v.trim()).optional(),
  postalCode: z.string().max(20).transform(v => v.trim()).optional(),
  country: z.string().max(100).transform(v => v.trim()).optional(),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
  creditLimit: z.number().min(0).optional(),
  taxId: z.string().max(50).transform(v => v.trim()).optional(),
})

export const listCustomersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().transform(v => v.trim()).optional(),
  sortBy: z.enum(['name', 'createdAt', 'email']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
