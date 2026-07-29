export type PlanData = {
  id: string; name: string; price: number; maxStaff: number
  maxProducts: number; maxBranches: number; features: string[]
}

export type InvoiceData = {
  id: string; businessId?: string; plan?: string; amount: number
  status: string; period?: string; createdAt?: Date
}

export type SubscriptionStats = {
  totalBusinesses: number; activeSubscriptions: number
  totalRevenue: number; planDistribution: Record<string, number>
  statusDistribution: Record<string, number>
}

export type ListPlansOutput = { plans: PlanData[] }

export type CreatePlanInput = {
  name: string; price: number; maxStaff: number
  maxProducts: number; maxBranches: number; features: string[]
}

export type UpdatePlanInput = {
  planId: string; name?: string; price?: number
  maxStaff?: number; maxProducts?: number; maxBranches?: number; features?: string[]
}