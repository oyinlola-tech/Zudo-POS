import type { FastifyRequest, FastifyReply } from 'fastify'
import { supplierService } from '../services/index.js'

export async function listSuppliersHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await supplierService.queries.list.execute({
    businessId: request.user.businessId,
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getSupplierHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const supplier = await supplierService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!supplier) return reply.status(404).send({ error: 'Supplier not found' })
  return reply.send(supplier)
}

export async function createSupplierHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await supplierService.commands.create.execute({
    businessId: request.user.businessId,
    name: body['name'] as string,
    contactName: body['contactName'] as string | undefined,
    email: body['email'] as string | undefined,
    phone: body['phone'] as string | undefined,
    address: body['address'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateSupplierHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await supplierService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    name: body['name'] as string | undefined,
    contactName: body['contactName'] as string | undefined,
    email: body['email'] as string | undefined,
    phone: body['phone'] as string | undefined,
    address: body['address'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function deleteSupplierHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await supplierService.commands.delete.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Delete failed' })
  }
}
