import type { FastifyInstance } from 'fastify'
import { changePlanHandler, generateInvoiceHandler, billingGetPlanHandler } from '../controllers/billing.controller.js'
import { authGuard, roleGuard } from '../middlewares/auth.middleware.js'

export async function registerBillingRoutes(fastify: FastifyInstance) {
  fastify.post('/api/billing/change-plan', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, changePlanHandler)
  fastify.post('/api/billing/generate-invoice', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, generateInvoiceHandler)
  fastify.get('/api/billing/plan/:businessId', { preHandler: [authGuard] }, billingGetPlanHandler)
}
