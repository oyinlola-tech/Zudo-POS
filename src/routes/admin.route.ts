import type { FastifyInstance } from 'fastify'
import {
  listBusinessesHandler, getBusinessHandler, updateBusinessHandler,
  suspendBusinessHandler, activateBusinessHandler, revenueStatsHandler,
} from '../controllers/admin.controller.js'
import { authGuard, roleGuard } from '../middlewares/auth.middleware.js'

export async function registerAdminRoutes(fastify: FastifyInstance) {
  fastify.get('/api/admin/businesses', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, listBusinessesHandler)
  fastify.get('/api/admin/businesses/:id', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, getBusinessHandler)
  fastify.put('/api/admin/businesses/:id', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, updateBusinessHandler)
  fastify.post('/api/admin/businesses/:id/suspend', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, suspendBusinessHandler)
  fastify.post('/api/admin/businesses/:id/activate', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, activateBusinessHandler)
  fastify.get('/api/admin/revenue', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, revenueStatsHandler)
}