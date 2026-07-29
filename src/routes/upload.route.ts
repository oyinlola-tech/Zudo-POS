import type { FastifyInstance } from 'fastify'
import { uploadHandler } from '../controllers/upload.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

export async function registerUploadRoutes(fastify: FastifyInstance) {
  fastify.post('/api/upload', { preHandler: [authGuard] }, uploadHandler)
}
