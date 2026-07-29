import type { FastifyInstance } from 'fastify'
import { listLoyaltyHandler, getLoyaltyHandler, updateLoyaltyTierHandler } from '../controllers/loyalty.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerLoyaltyRoutes(fastify: FastifyInstance) {
  fastify.get('/api/loyalty', { preHandler: [authGuard] }, listLoyaltyHandler)
  fastify.get('/api/loyalty/:id', { preHandler: [authGuard] }, getLoyaltyHandler)
  fastify.put('/api/loyalty/:id/tier', { preHandler: [authGuard] }, updateLoyaltyTierHandler)
}
