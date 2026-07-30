import { z } from 'zod'

export const updateTierSchema = z.object({
  customerId: z.string().uuid(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']),
  points: z.number().int().min(0).optional(),
})
