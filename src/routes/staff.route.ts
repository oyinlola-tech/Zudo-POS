import type { FastifyInstance } from 'fastify'
import {
  listStaffHandler, getStaffHandler, createStaffHandler, updateStaffHandler, deleteStaffHandler,
} from '../controllers/staff.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'
import { validateBody } from '../middlewares/validate.middleware.js'
import { createStaffSchema, updateStaffSchema } from '../validators/index.js'

export async function registerStaffRoutes(fastify: FastifyInstance) {
  fastify.get('/api/staff', { preHandler: [authGuard] }, listStaffHandler)
  fastify.get('/api/staff/:id', { preHandler: [authGuard] }, getStaffHandler)
  fastify.post('/api/staff', { preHandler: [authGuard, validateBody(createStaffSchema)] }, createStaffHandler)
  fastify.put('/api/staff/:id', { preHandler: [authGuard, validateBody(updateStaffSchema)] }, updateStaffHandler)
  fastify.delete('/api/staff/:id', { preHandler: [authGuard] }, deleteStaffHandler)
}
