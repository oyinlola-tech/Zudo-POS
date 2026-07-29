import type { FastifyInstance } from 'fastify'
import { sendOtpMailHandler, mailStatusHandler } from '../controllers/mail.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerMailRoutes(fastify: FastifyInstance) {
  fastify.post('/api/mail/send-otp', { preHandler: [authGuard] }, sendOtpMailHandler)
  fastify.get('/api/mail/status/:messageId', { preHandler: [authGuard] }, mailStatusHandler)
}
