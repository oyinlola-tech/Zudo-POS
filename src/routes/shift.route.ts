import type { FastifyInstance } from 'fastify'
import {
  startShiftHandler,
  endShiftHandler,
  activeShiftHandler,
  getShiftByIdHandler,
  shiftHistoryHandler,
} from '../controllers/shift.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerShiftRoutes(fastify: FastifyInstance) {
  fastify.post('/api/shift/start', { preHandler: [authGuard] }, startShiftHandler)
  fastify.post('/api/shift/end', { preHandler: [authGuard] }, endShiftHandler)
  fastify.get('/api/shift/active', { preHandler: [authGuard] }, activeShiftHandler)
  fastify.get('/api/shift/history', { preHandler: [authGuard] }, shiftHistoryHandler)
  fastify.get('/api/shift/:id', { preHandler: [authGuard] }, getShiftByIdHandler)
}
