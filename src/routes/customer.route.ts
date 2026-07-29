import type { FastifyInstance } from 'fastify'
import {
  listCustomersHandler, getCustomerHandler, createCustomerHandler,
  updateCustomerHandler, customerStatsHandler, deleteCustomerHandler,
} from '../controllers/customer.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerCustomerRoutes(fastify: FastifyInstance) {
  fastify.get('/api/customers', { preHandler: [authGuard] }, listCustomersHandler)
  fastify.get('/api/customers/stats', { preHandler: [authGuard] }, customerStatsHandler)
  fastify.get('/api/customers/:id', { preHandler: [authGuard] }, getCustomerHandler)
  fastify.post('/api/customers', { preHandler: [authGuard] }, createCustomerHandler)
  fastify.put('/api/customers/:id', { preHandler: [authGuard] }, updateCustomerHandler)
  fastify.delete('/api/customers/:id', { preHandler: [authGuard] }, deleteCustomerHandler)
}