import type { FastifyRequest, FastifyReply } from 'fastify'
import { discountService } from '../services/index.js'

export async function listDiscountsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await discountService.queries.list.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function getDiscountHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const discount = await discountService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!discount) return reply.status(404).send({ error: 'Discount not found' })
  return reply.send(discount)
}

export async function createDiscountHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await discountService.commands.create.execute({
    businessId: request.user.businessId,
    name: body['name'] as string,
    type: body['type'] as string,
    value: body['value'] as number,
    minPurchase: body['minPurchase'] as number | undefined,
    startsAt: body['startsAt'] ? new Date(body['startsAt'] as string) : undefined,
    endsAt: body['endsAt'] ? new Date(body['endsAt'] as string) : undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateDiscountHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await discountService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    name: body['name'] as string | undefined,
    type: body['type'] as string | undefined,
    value: body['value'] as number | undefined,
    minPurchase: body['minPurchase'] as number | undefined,
    isActive: body['isActive'] as boolean | undefined,
    startsAt: body['startsAt'] ? new Date(body['startsAt'] as string) : undefined,
    endsAt: body['endsAt'] ? new Date(body['endsAt'] as string) : undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function deleteDiscountHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await discountService.commands.delete.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Delete failed' })
  }
}
