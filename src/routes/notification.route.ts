import type { FastifyInstance } from 'fastify'
import {
  notificationsHandler,
  markNotifReadHandler,
  markAllNotifReadHandler,
  broadcastHandler,
  broadcastHistoryHandler,
} from '../controllers/notification.controller.js'
import { authGuard, roleGuard } from '../middlewares/auth.middleware.js'

export async function registerNotificationRoutes(fastify: FastifyInstance) {
  fastify.get('/api/auth/notifications', { preHandler: [authGuard] }, notificationsHandler)
  fastify.put('/api/auth/notifications/:id/read', { preHandler: [authGuard] }, markNotifReadHandler)
  fastify.put('/api/auth/notifications/read-all', { preHandler: [authGuard] }, markAllNotifReadHandler)
  fastify.post('/api/auth/notifications/broadcast', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, broadcastHandler)
  fastify.get('/api/auth/notifications/history', { preHandler: [authGuard, roleGuard('SUPERADMIN')] }, broadcastHistoryHandler)
}