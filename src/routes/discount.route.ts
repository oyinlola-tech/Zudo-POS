import type { FastifyInstance } from 'fastify'
import {
  listDiscountsHandler, getDiscountHandler, createDiscountHandler,
  updateDiscountHandler, deleteDiscountHandler,
} from '../controllers/discount.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerDiscountRoutes(fastify: FastifyInstance) {
  fastify.get('/api/discounts', { preHandler: [authGuard] }, listDiscountsHandler)
  fastify.get('/api/discounts/:id', { preHandler: [authGuard] }, getDiscountHandler)
  fastify.post('/api/discounts', { preHandler: [authGuard] }, createDiscountHandler)
  fastify.put('/api/discounts/:id', { preHandler: [authGuard] }, updateDiscountHandler)
  fastify.delete('/api/discounts/:id', { preHandler: [authGuard] }, deleteDiscountHandler)
}
