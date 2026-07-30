import type { FastifyInstance } from 'fastify'
import { changePlanHandler, generateInvoiceHandler, billingGetPlanHandler, listInvoicesHandler, getInvoiceHandler, cancelPlanHandler } from '../controllers/billing.controller.js'
import { authGuard, roleGuard } from '../middlewares/auth.middleware.js'

export async function registerBillingRoutes(fastify: FastifyInstance) {
  fastify.post('/api/billing/change-plan', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, changePlanHandler)
  fastify.post('/api/billing/generate-invoice', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, generateInvoiceHandler)
  fastify.get('/api/billing/plan/:businessId', { preHandler: [authGuard] }, billingGetPlanHandler)
  fastify.get('/api/billing/invoices/:businessId', { preHandler: [authGuard] }, listInvoicesHandler)
  fastify.get('/api/billing/invoice/:invoiceId', { preHandler: [authGuard] }, getInvoiceHandler)
  fastify.post('/api/billing/cancel-plan', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, cancelPlanHandler)
}
