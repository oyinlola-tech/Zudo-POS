import type { FastifyInstance } from 'fastify'
import { processReturnHandler, listReturnsHandler, getReturnHandler, approveReturnHandler, rejectReturnHandler } from '../controllers/returns.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerReturnsRoutes(fastify: FastifyInstance) {
  fastify.post('/api/returns', { preHandler: [authGuard] }, processReturnHandler)
  fastify.get('/api/returns', { preHandler: [authGuard] }, listReturnsHandler)
  fastify.get('/api/returns/:id', { preHandler: [authGuard] }, getReturnHandler)
  fastify.post('/api/returns/:id/approve', { preHandler: [authGuard] }, approveReturnHandler)
  fastify.post('/api/returns/:id/reject', { preHandler: [authGuard] }, rejectReturnHandler)
}
