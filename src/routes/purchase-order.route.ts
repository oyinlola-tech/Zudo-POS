import type { FastifyInstance } from 'fastify'
import {
  listPurchaseOrdersHandler, getPurchaseOrderHandler, createPurchaseOrderHandler,
  updatePurchaseOrderHandler, deletePurchaseOrderHandler,
  receivePurchaseOrderHandler, cancelPurchaseOrderHandler,
} from '../controllers/purchase-order.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerPurchaseOrderRoutes(fastify: FastifyInstance) {
  fastify.get('/api/purchase-orders', { preHandler: [authGuard] }, listPurchaseOrdersHandler)
  fastify.get('/api/purchase-orders/:id', { preHandler: [authGuard] }, getPurchaseOrderHandler)
  fastify.post('/api/purchase-orders', { preHandler: [authGuard] }, createPurchaseOrderHandler)
  fastify.put('/api/purchase-orders/:id', { preHandler: [authGuard] }, updatePurchaseOrderHandler)
  fastify.delete('/api/purchase-orders/:id', { preHandler: [authGuard] }, deletePurchaseOrderHandler)
  fastify.post('/api/purchase-orders/:id/receive', { preHandler: [authGuard] }, receivePurchaseOrderHandler)
  fastify.post('/api/purchase-orders/:id/cancel', { preHandler: [authGuard] }, cancelPurchaseOrderHandler)
}
