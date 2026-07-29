import type { FastifyRequest, FastifyReply } from 'fastify'
import { reportsService } from '../services/index.js'

export async function getReportHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as { type?: string }
  const result = await reportsService.queries.getReport.execute({
    businessId: request.user.businessId,
    type: query.type ?? 'daily',
  })
  return reply.send(result)
}
