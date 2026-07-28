import type { FastifyInstance } from 'fastify'
import { dashboardHandler, branchPerformanceHandler } from '../controllers/analytics.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerAnalyticsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/analytics', { preHandler: [authGuard] }, dashboardHandler)
  fastify.get('/api/analytics/branches', { preHandler: [authGuard] }, branchPerformanceHandler)
}