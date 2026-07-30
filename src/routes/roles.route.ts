import type { FastifyInstance } from 'fastify'
import { listRolesHandler, getRoleHandler, createRoleHandler, updateRoleHandler, deleteRoleHandler } from '../controllers/roles.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerRolesRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/roles', { preHandler: [authGuard] }, listRolesHandler)
  fastify.get('/api/auth/roles/:role', { preHandler: [authGuard] }, getRoleHandler)
  fastify.post('/api/auth/roles', { preHandler: [authGuard] }, createRoleHandler)
  fastify.put('/api/auth/roles/:roleId', { preHandler: [authGuard] }, updateRoleHandler)
  fastify.delete('/api/auth/roles/:roleId', { preHandler: [authGuard] }, deleteRoleHandler)
}
