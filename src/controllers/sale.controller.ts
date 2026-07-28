import type { FastifyRequest, FastifyReply } from 'fastify'
import { saleService } from '../services/index.js'

export async function createSaleHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await saleService.commands.create.execute({
    businessId: request.user.businessId,
    userId: request.user.userId,
    subtotal: body['subtotal'] as number,
    total: body['total'] as number,
    items: body['items'] as Array<{ productId: string; quantity: number; unitPrice: number; total: number }>,
    discount: body['discount'] as number | undefined,
    tax: body['tax'] as number | undefined,
    paymentMethod: body['paymentMethod'] as string | undefined,
    notes: body['notes'] as string | undefined,
    shiftId: body['shiftId'] as string | undefined,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function listSalesHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await saleService.queries.list.execute({
    businessId: request.user.businessId,
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
    status: query['status'],
  })
  return reply.send(result)
}

export async function getSaleHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const sale = await saleService.queries.get.execute({ id })
  if (!sale) return reply.status(404).send({ error: 'Sale not found' })
  return reply.send(sale)
}

export async function voidSaleHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  try {
    const result = await saleService.commands.void.execute({
      id,
      userId: request.user?.userId,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Void failed' })
  }
}

export async function saleStatsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await saleService.queries.stats.execute({ businessId: request.user.businessId })
  return reply.send(result)
}