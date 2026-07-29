import type { FastifyRequest, FastifyReply } from 'fastify'
import { notificationService } from '../services/index.js'

export async function notificationsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await notificationService.queries.getNotifications.execute({
    userId: request.user.userId,
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function markNotifReadHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  try {
    const result = await notificationService.commands.markRead.execute({ notificationId: id })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Notification not found' })
  }
}

export async function markAllNotifReadHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await notificationService.commands.markAllRead.execute({ userId: request.user.userId })
  return reply.send(result)
}

export async function broadcastHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as { title?: string; message?: string; type?: string }
  if (!body.title || !body.message) return reply.status(400).send({ error: 'title and message are required' })
  const result = await notificationService.commands.broadcast.execute({
    businessId: request.user.businessId,
    title: body.title,
    message: body.message,
    type: body.type,
  })
  return reply.send(result)
}

export async function broadcastHistoryHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await notificationService.queries.getBroadcastHistory.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function updateNotificationSettingsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, string>
  const result = await notificationService.commands.updateSettings.execute({
    businessId: request.user.businessId,
    settings: body,
  })
  return reply.send(result)
}