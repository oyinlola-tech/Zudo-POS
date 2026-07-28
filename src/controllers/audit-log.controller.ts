import type { FastifyRequest, FastifyReply } from 'fastify'
import { auditLogService } from '../services/index.js'

export async function listAuditLogsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await auditLogService.queries.list.execute({
    businessId: request.user.businessId ?? undefined,
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
    action: query['action'] ?? undefined,
    startDate: query['startDate'] ?? undefined,
    endDate: query['endDate'] ?? undefined,
  })
  return reply.send(result)
}