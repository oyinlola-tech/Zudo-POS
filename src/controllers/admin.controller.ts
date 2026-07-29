import type { FastifyRequest, FastifyReply } from 'fastify'
import { adminService } from '../services/index.js'

export async function listBusinessesHandler(request: FastifyRequest, reply: FastifyReply) {
  const query = request.query as Record<string, string | undefined>
  const result = await adminService.queries.listBusinesses.execute({
    search: query['search'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getBusinessHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const result = await adminService.queries.getBusiness.execute({ id })
  if (!result) return reply.status(404).send({ error: 'Business not found' })
  return reply.send(result)
}

export async function updateBusinessHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await adminService.commands.updateBusiness.execute({ id, ...body })
  return reply.send(result)
}

export async function suspendBusinessHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const result = await adminService.commands.updateBusiness.execute({ id, status: 'SUSPENDED' })
  return reply.send(result)
}

export async function activateBusinessHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const result = await adminService.commands.updateBusiness.execute({ id, status: 'ACTIVE' })
  return reply.send(result)
}

export async function revenueStatsHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = await adminService.queries.revenueStats.execute()
  return reply.send(result)
}

export async function createBusinessHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as Record<string, string>
  if (!body.name || !body.ownerEmail || !body.ownerFirstName || !body.ownerLastName) {
    return reply.status(400).send({ error: 'name, ownerEmail, ownerFirstName, ownerLastName are required' })
  }
  try {
    const result = await adminService.commands.createBusiness.execute({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      ownerEmail: body.ownerEmail,
      ownerPassword: body.ownerPassword,
      ownerFirstName: body.ownerFirstName,
      ownerLastName: body.ownerLastName,
    })
    return reply.status(201).send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Creation failed' })
  }
}