import type { FastifyInstance } from 'fastify'
import { getReportHandler, listReportsHandler, exportReportHandler, scheduleReportHandler } from '../controllers/report.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerReportRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/reports', { preHandler: [authGuard] }, getReportHandler)
  fastify.get('/api/auth/reports/list', { preHandler: [authGuard] }, listReportsHandler)
  fastify.get('/api/auth/reports/export', { preHandler: [authGuard] }, exportReportHandler)
  fastify.post('/api/auth/reports/schedule', { preHandler: [authGuard] }, scheduleReportHandler)
}
