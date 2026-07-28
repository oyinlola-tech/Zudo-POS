import type { FastifyInstance } from 'fastify'
import { processReturnHandler, listReturnsHandler } from '../controllers/returns.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerReturnsRoutes(fastify: FastifyInstance) {
  fastify.post('/api/returns', { preHandler: [authGuard] }, processReturnHandler)
  fastify.get('/api/returns', { preHandler: [authGuard] }, listReturnsHandler)
}