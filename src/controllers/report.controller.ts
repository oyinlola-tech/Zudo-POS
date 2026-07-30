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

export async function listReportsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await reportsService.queries.list.execute({
    businessId: request.user.businessId,
  })
  return reply.send(result)
}

export async function exportReportHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as { type?: string; format?: string }
  const result = await reportsService.queries.export.execute({
    businessId: request.user.businessId,
    type: query.type ?? 'daily',
    format: query.format ?? 'csv',
  })
  return reply.header('Content-Type', 'text/csv').send(result.csv)
}

export async function scheduleReportHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as { type?: string; email?: string; frequency?: string }
  if (!body.type || !body.email || !body.frequency) {
    return reply.status(400).send({ error: 'type, email, and frequency are required' })
  }
  const result = await reportsService.commands.schedule.execute({
    businessId: request.user.businessId, type: body.type, email: body.email, frequency: body.frequency,
  })
  return reply.send(result)
}
