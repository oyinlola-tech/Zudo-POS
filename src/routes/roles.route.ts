import type { FastifyInstance } from 'fastify'
import { listRolesHandler, createRoleHandler } from '../controllers/roles.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerRolesRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/roles', { preHandler: [authGuard] }, listRolesHandler)
  fastify.post('/api/auth/roles', { preHandler: [authGuard] }, createRoleHandler)
}