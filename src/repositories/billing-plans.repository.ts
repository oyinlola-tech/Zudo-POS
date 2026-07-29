import { getDb } from '../databases/index.js'

const DEFAULT_PLANS = [
  { id: 'free', name: 'Free', price: 0, maxStaff: 1, maxProducts: 50, maxBranches: 1, features: ['Basic POS', 'Sales Reports', 'Inventory Management'] },
  { id: 'starter', name: 'Starter', price: 29, maxStaff: 5, maxProducts: 500, maxBranches: 2, features: ['Advanced POS', 'Sales Reports', 'Inventory Management', 'Customer Management', 'Basic Analytics'] },
  { id: 'professional', name: 'Professional', price: 79, maxStaff: 20, maxProducts: 5000, maxBranches: 5, features: ['Everything in Starter', 'Advanced Analytics', 'Loyalty Program', 'Multi-branch', 'Staff Management', 'API Access'] },
  { id: 'enterprise', name: 'Enterprise', price: 199, maxStaff: 999, maxProducts: 99999, maxBranches: 99, features: ['Everything in Professional', 'White Label', 'Dedicated Support', 'Custom Integration', 'SLA Guarantee'] },
]

export const billingPlansRepository = {
  async listPlans() {
    return { plans: DEFAULT_PLANS }
  },

  async getPlan(planId: string) {
    const plan = DEFAULT_PLANS.find(p => p.id === planId)
    if (!plan) throw new Error('Plan not found')
    return plan
  },

  async createPlan(data: { name: string; price: number; maxStaff: number; maxProducts: number; maxBranches: number; features: string[] }) {
    const id = data.name.toLowerCase().replace(/\s+/g, '-')
    return { id, ...data }
  },

  async updatePlan(planId: string, data: Record<string, unknown>) {
    return { id: planId, ...data }
  },

  async listInvoices(businessId: string, options?: { page?: number; limit?: number }) {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const business = await getDb().business.findUnique({ where: { id: businessId } })
    const invoices = business ? [
      { id: 'inv_001', businessId, plan: business.plan, amount: 0, status: 'PAID', period: `${startOfMonth.toISOString().split('T')[0]} - ${now.toISOString().split('T')[0]}`, createdAt: startOfMonth },
    ] : []

    return { items: invoices, total: invoices.length, page, limit }
  },

  async getInvoice(invoiceId: string) {
    return { id: invoiceId, plan: 'FREE', amount: 0, status: 'PAID' }
  },

  async getSubscriptionStats() {
    const businesses = await getDb().business.findMany({ select: { plan: true, status: true } })
    const planDistribution: Record<string, number> = {}
    const statusDistribution: Record<string, number> = {}
    let activeSubscriptions = 0
    let totalRevenue = 0

    const planPrices: Record<string, number> = { FREE: 0, STARTER: 29, PROFESSIONAL: 79, ENTERPRISE: 199 }

    for (const b of businesses) {
      planDistribution[b.plan] = (planDistribution[b.plan] || 0) + 1
      statusDistribution[b.status] = (statusDistribution[b.status] || 0) + 1
      if (b.status === 'ACTIVE') {
        activeSubscriptions++
        totalRevenue += planPrices[b.plan] || 0
      }
    }

    return { totalBusinesses: businesses.length, activeSubscriptions, totalRevenue, planDistribution, statusDistribution }
  },
}