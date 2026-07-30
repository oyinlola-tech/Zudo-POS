import type { FastifyInstance } from 'fastify'
import { sendOtpMailHandler, mailStatusHandler, sendCustomEmailHandler, sendBulkEmailHandler, emailLogsHandler } from '../controllers/mail.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerMailRoutes(fastify: FastifyInstance) {
  fastify.post('/api/mail/send-otp', { preHandler: [authGuard] }, sendOtpMailHandler)
  fastify.get('/api/mail/status/:messageId', { preHandler: [authGuard] }, mailStatusHandler)
  fastify.post('/api/mail/send-custom', { preHandler: [authGuard] }, sendCustomEmailHandler)
  fastify.post('/api/mail/send-bulk', { preHandler: [authGuard] }, sendBulkEmailHandler)
  fastify.get('/api/mail/logs', { preHandler: [authGuard] }, emailLogsHandler)
}
