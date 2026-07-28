import type { FastifyRequest, FastifyReply } from 'fastify'
import { staffService } from '../services/index.js'

export async function listStaffHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await staffService.queries.list.execute({
    businessId: request.user.businessId,
    search: query['search'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getStaffHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const staff = await staffService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!staff) return reply.status(404).send({ error: 'Staff not found' })
  return reply.send(staff)
}

export async function createStaffHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await staffService.commands.create.execute({
    businessId: request.user.businessId,
    firstName: body['firstName'] as string,
    lastName: body['lastName'] as string,
    email: body['email'] as string,
    password: body['password'] as string,
    role: body['role'] as string,
    phone: body['phone'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateStaffHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await staffService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    firstName: body['firstName'] as string | undefined,
    lastName: body['lastName'] as string | undefined,
    email: body['email'] as string | undefined,
    role: body['role'] as string | undefined,
    isActive: body['isActive'] as boolean | undefined,
    phone: body['phone'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}