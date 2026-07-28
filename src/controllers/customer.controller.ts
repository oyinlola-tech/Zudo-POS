import type { FastifyRequest, FastifyReply } from 'fastify'
import { customerService } from '../services/index.js'

export async function listCustomersHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await customerService.queries.list.execute({
    businessId: request.user.businessId,
    search: query['search'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getCustomerHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const customer = await customerService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!customer) return reply.status(404).send({ error: 'Customer not found' })
  return reply.send(customer)
}

export async function createCustomerHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await customerService.commands.create.execute({
    businessId: request.user.businessId,
    firstName: body['firstName'] as string,
    lastName: body['lastName'] as string,
    email: body['email'] as string | undefined,
    phone: body['phone'] as string | undefined,
    address: body['address'] as string | undefined,
    notes: body['notes'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateCustomerHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await customerService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    firstName: body['firstName'] as string | undefined,
    lastName: body['lastName'] as string | undefined,
    email: body['email'] as string | undefined,
    phone: body['phone'] as string | undefined,
    address: body['address'] as string | undefined,
    notes: body['notes'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function customerStatsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await customerService.queries.stats.execute({ businessId: request.user.businessId })
  return reply.send(result)
}