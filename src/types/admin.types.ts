export type BusinessData = {
  id: string; name: string; slug: string; email?: string | null
  phone?: string | null; address?: string | null; logo?: string | null
  plan: string; status: string; trialEnds?: Date | null
  createdAt: Date; updatedAt: Date; _count?: { users?: number; products?: number; sales?: number }
}

export type ListBusinessesOutput = {
  items: BusinessData[]; total: number; page: number; limit: number
}

export type RevenueStatsOutput = {
  totalBusinesses: number; totalRevenue: number
  planDistribution: Record<string, number>; activeSubscriptions: number
}