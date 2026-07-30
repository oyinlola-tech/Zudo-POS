import type { FastifyInstance } from 'fastify'
import {
  listTaxesHandler, getTaxHandler, createTaxHandler,
  updateTaxHandler, deleteTaxHandler,
} from '../controllers/tax.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerTaxRoutes(fastify: FastifyInstance) {
  fastify.get('/api/taxes', { preHandler: [authGuard] }, listTaxesHandler)
  fastify.get('/api/taxes/:id', { preHandler: [authGuard] }, getTaxHandler)
  fastify.post('/api/taxes', { preHandler: [authGuard] }, createTaxHandler)
  fastify.put('/api/taxes/:id', { preHandler: [authGuard] }, updateTaxHandler)
  fastify.delete('/api/taxes/:id', { preHandler: [authGuard] }, deleteTaxHandler)
}
