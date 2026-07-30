import type { FastifyRequest, FastifyReply } from 'fastify'
import { purchaseOrderService } from '../services/index.js'

export async function listPurchaseOrdersHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await purchaseOrderService.queries.list.execute({
    businessId: request.user.businessId,
    status: query['status'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getPurchaseOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const po = await purchaseOrderService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!po) return reply.status(404).send({ error: 'Purchase order not found' })
  return reply.send(po)
}

export async function createPurchaseOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await purchaseOrderService.commands.create.execute({
    businessId: request.user.businessId,
    reference: body['reference'] as string,
    supplierId: body['supplierId'] as string | undefined,
    items: body['items'] as { productId: string; quantity: number; unitCost: number; total: number }[],
    createdBy: request.user.userId,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updatePurchaseOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await purchaseOrderService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    reference: body['reference'] as string | undefined,
    supplierId: body['supplierId'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function deletePurchaseOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await purchaseOrderService.commands.delete.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Delete failed' })
  }
}

export async function receivePurchaseOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await purchaseOrderService.commands.receive.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Receive failed' })
  }
}

export async function cancelPurchaseOrderHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await purchaseOrderService.commands.cancel.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Cancel failed' })
  }
}
