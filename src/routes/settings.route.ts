import type { FastifyInstance } from 'fastify'
import {
  getSettingsHandler, updateSettingsHandler,
  getBranchesHandler, getBranchHandler, upsertBranchHandler,
  getLoyaltyConfigHandler, updateLoyaltyConfigHandler, getLoyaltyActivityHandler,
} from '../controllers/settings.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerSettingsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/settings', { preHandler: [authGuard] }, getSettingsHandler)
  fastify.put('/api/settings', { preHandler: [authGuard] }, updateSettingsHandler)
  fastify.get('/api/settings/branches', { preHandler: [authGuard] }, getBranchesHandler)
  fastify.get('/api/settings/branches/:id', { preHandler: [authGuard] }, getBranchHandler)
  fastify.post('/api/settings/branches', { preHandler: [authGuard] }, upsertBranchHandler)
  fastify.put('/api/settings/branches/:id', { preHandler: [authGuard] }, upsertBranchHandler)
  fastify.get('/api/settings/loyalty/config', { preHandler: [authGuard] }, getLoyaltyConfigHandler)
  fastify.put('/api/settings/loyalty/config', { preHandler: [authGuard] }, updateLoyaltyConfigHandler)
  fastify.get('/api/settings/loyalty/activity', { preHandler: [authGuard] }, getLoyaltyActivityHandler)
}