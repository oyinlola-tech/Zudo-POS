import type { FastifyInstance } from 'fastify'
import { getReportHandler } from '../controllers/report.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerReportRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/reports', { preHandler: [authGuard] }, getReportHandler)
}
