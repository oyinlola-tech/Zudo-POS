import type { FastifyInstance } from 'fastify'
import {
  listExpensesHandler, getExpenseHandler, createExpenseHandler,
  updateExpenseHandler, deleteExpenseHandler,
} from '../controllers/expense.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerExpenseRoutes(fastify: FastifyInstance) {
  fastify.get('/api/expenses', { preHandler: [authGuard] }, listExpensesHandler)
  fastify.get('/api/expenses/:id', { preHandler: [authGuard] }, getExpenseHandler)
  fastify.post('/api/expenses', { preHandler: [authGuard] }, createExpenseHandler)
  fastify.put('/api/expenses/:id', { preHandler: [authGuard] }, updateExpenseHandler)
  fastify.delete('/api/expenses/:id', { preHandler: [authGuard] }, deleteExpenseHandler)
}
