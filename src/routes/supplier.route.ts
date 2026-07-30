import type { FastifyInstance } from 'fastify'
import {
  listSuppliersHandler, getSupplierHandler, createSupplierHandler,
  updateSupplierHandler, deleteSupplierHandler,
} from '../controllers/supplier.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerSupplierRoutes(fastify: FastifyInstance) {
  fastify.get('/api/suppliers', { preHandler: [authGuard] }, listSuppliersHandler)
  fastify.get('/api/suppliers/:id', { preHandler: [authGuard] }, getSupplierHandler)
  fastify.post('/api/suppliers', { preHandler: [authGuard] }, createSupplierHandler)
  fastify.put('/api/suppliers/:id', { preHandler: [authGuard] }, updateSupplierHandler)
  fastify.delete('/api/suppliers/:id', { preHandler: [authGuard] }, deleteSupplierHandler)
}
