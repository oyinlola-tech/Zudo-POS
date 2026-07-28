import type { FastifyRequest, FastifyReply } from 'fastify'
import { rolesService } from '../services/index.js'

export async function listRolesHandler(_request: FastifyRequest, reply: FastifyReply) {
  const result = await rolesService.queries.list.execute(undefined)
  return reply.send(result)
}

export async function createRoleHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as Record<string, unknown>
  try {
    const result = await rolesService.commands.create.execute({
      name: body['name'] as string,
      permissions: body['permissions'] as Record<string, boolean> | undefined,
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Failed to create role' })
  }
}