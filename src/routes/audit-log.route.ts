import type { FastifyInstance } from 'fastify'
import { listAuditLogsHandler, getAuditLogHandler, auditLogStatsHandler, exportAuditLogsHandler } from '../controllers/audit-log.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerAuditLogRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/audit-logs', { preHandler: [authGuard] }, listAuditLogsHandler)
  fastify.get('/api/auth/audit-logs/stats', { preHandler: [authGuard] }, auditLogStatsHandler)
  fastify.get('/api/auth/audit-logs/export', { preHandler: [authGuard] }, exportAuditLogsHandler)
  fastify.get('/api/auth/audit-logs/:id', { preHandler: [authGuard] }, getAuditLogHandler)
}
