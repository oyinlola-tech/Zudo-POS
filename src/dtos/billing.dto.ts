export type BillingPlanRequest = { plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' }

export type InvoiceRequest = {
  businessId: string
  amount: number
  description: string
}

export type PlanResponse = {
  plan: string
  status: string
} | null