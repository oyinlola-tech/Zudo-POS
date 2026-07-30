import { z } from 'zod'

export const createStaffSchema = z.object({
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()),
  password: z.string().min(6).max(128),
  firstName: z.string().min(1).max(100).transform(v => v.trim()),
  lastName: z.string().min(1).max(100).transform(v => v.trim()),
  phone: z.string().max(20).transform(v => v.trim()).optional(),
  role: z.enum(['admin', 'manager', 'cashier', 'kitchen']),
  pin: z.string().length(4).regex(/^\d{4}$/),
  isActive: z.boolean().optional(),
})

export const updateStaffSchema = z.object({
  firstName: z.string().min(1).max(100).transform(v => v.trim()).optional(),
  lastName: z.string().min(1).max(100).transform(v => v.trim()).optional(),
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()).optional(),
  phone: z.string().max(20).transform(v => v.trim()).optional(),
  role: z.enum(['admin', 'manager', 'cashier', 'kitchen']).optional(),
  isActive: z.boolean().optional(),
})

export const listStaffQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().transform(v => v.trim()).optional(),
  role: z.enum(['admin', 'manager', 'cashier', 'kitchen']).optional(),
  isActive: z.enum(['true', 'false']).optional(),
  sortBy: z.enum(['firstName', 'lastName', 'email', 'createdAt', 'role']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
