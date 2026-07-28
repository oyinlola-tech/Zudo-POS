import type { FastifyInstance } from 'fastify'
import { listAuditLogsHandler } from '../controllers/audit-log.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerAuditLogRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/audit-logs', { preHandler: [authGuard] }, listAuditLogsHandler)
}