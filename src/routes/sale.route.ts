import type { FastifyInstance } from 'fastify'
import {
  createSaleHandler, listSalesHandler, getSaleHandler, voidSaleHandler, saleStatsHandler,
} from '../controllers/sale.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'
import { validateBody } from '../middlewares/validate.middleware.js'
import { createSaleSchema } from '../validators/index.js'

export async function registerSaleRoutes(fastify: FastifyInstance) {
  fastify.post('/api/sales', { preHandler: [authGuard, validateBody(createSaleSchema)] }, createSaleHandler)
  fastify.get('/api/sales', { preHandler: [authGuard] }, listSalesHandler)
  fastify.get('/api/sales/stats', { preHandler: [authGuard] }, saleStatsHandler)
  fastify.get('/api/sales/:id', { preHandler: [authGuard] }, getSaleHandler)
  fastify.post('/api/sales/:id/void', { preHandler: [authGuard] }, voidSaleHandler)
}
