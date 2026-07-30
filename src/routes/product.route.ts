import type { FastifyInstance } from 'fastify'
import {
  listProductsHandler, getProductHandler, createProductHandler,
  updateProductHandler, deleteProductHandler, searchProductsHandler, inventoryStatsHandler,
} from '../controllers/product.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js'
import { createProductSchema, updateProductSchema, listProductsQuerySchema } from '../validators/index.js'

export async function registerProductRoutes(fastify: FastifyInstance) {
  fastify.get('/api/products', { preHandler: [authGuard] }, listProductsHandler)
  fastify.get('/api/products/search', { preHandler: [authGuard] }, searchProductsHandler)
  fastify.get('/api/products/inventory-stats', { preHandler: [authGuard] }, inventoryStatsHandler)
  fastify.get('/api/products/:id', { preHandler: [authGuard] }, getProductHandler)
  fastify.post('/api/products', { preHandler: [authGuard, validateBody(createProductSchema)] }, createProductHandler)
  fastify.put('/api/products/:id', { preHandler: [authGuard, validateBody(updateProductSchema)] }, updateProductHandler)
  fastify.delete('/api/products/:id', { preHandler: [authGuard] }, deleteProductHandler)
}
