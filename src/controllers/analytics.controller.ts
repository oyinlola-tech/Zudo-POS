import type { FastifyRequest, FastifyReply } from 'fastify'
import { analyticsService } from '../services/index.js'

export async function dashboardHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await analyticsService.queries.dashboard.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function branchPerformanceHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await analyticsService.queries.branchPerformance.execute({ businessId: request.user.businessId })
  return reply.send(result)
}