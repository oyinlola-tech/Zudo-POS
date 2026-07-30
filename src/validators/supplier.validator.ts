import { z } from 'zod'

export const createSupplierSchema = z.object({
  name: z.string().min(1).max(200).transform(v => v.trim()),
  contactName: z.string().max(200).transform(v => v.trim()).optional(),
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()).optional(),
  phone: z.string().max(20).transform(v => v.trim()).optional(),
  address: z.string().max(500).transform(v => v.trim()).optional(),
  city: z.string().max(100).transform(v => v.trim()).optional(),
  state: z.string().max(100).transform(v => v.trim()).optional(),
  postalCode: z.string().max(20).transform(v => v.trim()).optional(),
  country: z.string().max(100).transform(v => v.trim()).optional(),
  taxId: z.string().max(50).transform(v => v.trim()).optional(),
  paymentTerms: z.string().max(200).transform(v => v.trim()).optional(),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
})

export const updateSupplierSchema = z.object({
  name: z.string().min(1).max(200).transform(v => v.trim()).optional(),
  contactName: z.string().max(200).transform(v => v.trim()).optional(),
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()).optional(),
  phone: z.string().max(20).transform(v => v.trim()).optional(),
  address: z.string().max(500).transform(v => v.trim()).optional(),
  city: z.string().max(100).transform(v => v.trim()).optional(),
  state: z.string().max(100).transform(v => v.trim()).optional(),
  postalCode: z.string().max(20).transform(v => v.trim()).optional(),
  country: z.string().max(100).transform(v => v.trim()).optional(),
  taxId: z.string().max(50).transform(v => v.trim()).optional(),
  paymentTerms: z.string().max(200).transform(v => v.trim()).optional(),
  notes: z.string().max(2000).transform(v => v.trim()).optional(),
})
