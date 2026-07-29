import type { FastifyInstance } from 'fastify'
import {
  listStaffHandler, getStaffHandler, createStaffHandler, updateStaffHandler, deleteStaffHandler,
} from '../controllers/staff.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerStaffRoutes(fastify: FastifyInstance) {
  fastify.get('/api/staff', { preHandler: [authGuard] }, listStaffHandler)
  fastify.get('/api/staff/:id', { preHandler: [authGuard] }, getStaffHandler)
  fastify.post('/api/staff', { preHandler: [authGuard] }, createStaffHandler)
  fastify.put('/api/staff/:id', { preHandler: [authGuard] }, updateStaffHandler)
  fastify.delete('/api/staff/:id', { preHandler: [authGuard] }, deleteStaffHandler)
}