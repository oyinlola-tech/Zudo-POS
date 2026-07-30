import { z } from 'zod'

export const createExpenseSchema = z.object({
  title: z.string().min(1).max(200).transform(v => v.trim()),
  description: z.string().max(2000).transform(v => v.trim()).optional(),
  amount: z.number().min(0),
  category: z.string().max(100).transform(v => v.trim()),
  paymentMethod: z.enum(['cash', 'card', 'mobile_money', 'bank_transfer']),
  reference: z.string().max(100).transform(v => v.trim()).optional(),
  date: z.string().datetime().optional(),
})

export const updateExpenseSchema = z.object({
  title: z.string().min(1).max(200).transform(v => v.trim()).optional(),
  description: z.string().max(2000).transform(v => v.trim()).optional(),
  amount: z.number().min(0).optional(),
  category: z.string().max(100).transform(v => v.trim()).optional(),
  paymentMethod: z.enum(['cash', 'card', 'mobile_money', 'bank_transfer']).optional(),
  reference: z.string().max(100).transform(v => v.trim()).optional(),
  date: z.string().datetime().optional(),
})

export const listExpensesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().transform(v => v.trim()).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  paymentMethod: z.enum(['cash', 'card', 'mobile_money', 'bank_transfer']).optional(),
  sortBy: z.enum(['date', 'amount', 'title', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
