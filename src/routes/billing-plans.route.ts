import type { FastifyInstance } from 'fastify'
import {
  listPlansHandler, getPlanHandler, createPlanHandler, updatePlanHandler,
  billingPlanListInvoicesHandler, billingPlanGetInvoiceHandler, getSubscriptionStatsHandler,
} from '../controllers/billing-plans.controller.js'
import { authGuard, roleGuard } from '../middlewares/auth.middleware.js'

export async function registerBillingPlansRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/billing/plans', listPlansHandler)
  fastify.get('/api/auth/billing/plans/:id', getPlanHandler)
  fastify.post('/api/auth/billing/plans', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, createPlanHandler)
  fastify.put('/api/auth/billing/plans/:id', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, updatePlanHandler)
  fastify.get('/api/auth/billing/invoices', { preHandler: [authGuard] }, billingPlanListInvoicesHandler)
  fastify.get('/api/auth/billing/invoices/:id', { preHandler: [authGuard] }, billingPlanGetInvoiceHandler)
  fastify.get('/api/auth/billing/subscriptions/stats', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, getSubscriptionStatsHandler)
}