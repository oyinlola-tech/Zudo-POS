import type { FastifyRequest, FastifyReply } from 'fastify'
import { rolesService } from '../services/index.js'

export async function listRolesHandler(_request: FastifyRequest, reply: FastifyReply) {
  const result = await rolesService.queries.list.execute(undefined)
  return reply.send(result)
}

export async function getRoleHandler(request: FastifyRequest, reply: FastifyReply) {
  const { role } = request.params as { role: string }
  const result = await rolesService.queries.get.execute({ role })
  if (!result) return reply.status(404).send({ error: 'Role not found' })
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

export async function updateRoleHandler(request: FastifyRequest, reply: FastifyReply) {
  const { roleId } = request.params as { roleId: string }
  const body = request.body as Record<string, unknown>
  try {
    const result = await rolesService.commands.update.execute({
      roleId,
      permissions: body['permissions'] as string[] | undefined,
      description: body['description'] as string | undefined,
      userId: request.user?.userId,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Failed to update role' })
  }
}

export async function deleteRoleHandler(request: FastifyRequest, reply: FastifyReply) {
  const { roleId } = request.params as { roleId: string }
  try {
    const result = await rolesService.commands.delete.execute({
      roleId, userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Failed to delete role' })
  }
}
