import type { FastifyRequest, FastifyReply } from 'fastify'
import { returnsService } from '../services/index.js'

export async function processReturnHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId || !request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  try {
    const result = await returnsService.commands.processReturn.execute({
      saleId: body['saleId'] as string,
      businessId: request.user.businessId,
      userId: request.user.userId,
      reason: body['reason'] as string | undefined,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Return failed' })
  }
}

export async function listReturnsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await returnsService.queries.listReturns.execute({
    businessId: request.user.businessId,
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getReturnHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const result = await returnsService.queries.getReturn.execute({ id })
  if (!result) return reply.status(404).send({ error: 'Return not found' })
  return reply.send(result)
}

export async function approveReturnHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await returnsService.commands.approveReturn.execute({
      id, userId: request.user.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Approve failed' })
  }
}

export async function rejectReturnHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  try {
    const result = await returnsService.commands.rejectReturn.execute({
      id, reason: body['reason'] as string | undefined, userId: request.user.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Reject failed' })
  }
}
