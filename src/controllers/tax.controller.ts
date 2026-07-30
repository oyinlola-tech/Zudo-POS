import type { FastifyRequest, FastifyReply } from 'fastify'
import { taxService } from '../services/index.js'

export async function listTaxesHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await taxService.queries.list.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function getTaxHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const tax = await taxService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!tax) return reply.status(404).send({ error: 'Tax not found' })
  return reply.send(tax)
}

export async function createTaxHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await taxService.commands.create.execute({
    businessId: request.user.businessId,
    name: body['name'] as string,
    rate: body['rate'] as number,
    type: body['type'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateTaxHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await taxService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    name: body['name'] as string | undefined,
    rate: body['rate'] as number | undefined,
    type: body['type'] as string | undefined,
    isActive: body['isActive'] as boolean | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function deleteTaxHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await taxService.commands.delete.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Delete failed' })
  }
}
