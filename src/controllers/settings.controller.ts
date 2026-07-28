import type { FastifyRequest, FastifyReply } from 'fastify'
import { settingsService } from '../services/index.js'

export async function getSettingsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await settingsService.queries.getSettings.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function updateSettingsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, string>
  const result = await settingsService.commands.updateSettings.execute({
    businessId: request.user.businessId,
    settings: body,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function getBranchesHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await settingsService.queries.getBranches.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function upsertBranchHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const { id } = request.params as { id?: string }
  const { settingsRepository } = await import('../repositories/index.js')
  const result = await settingsRepository.upsertBranch(request.user.businessId, id ?? null, body)
  return reply.send(result)
}

export async function getLoyaltyConfigHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await settingsService.queries.getLoyaltyConfig.execute({ businessId: request.user.businessId })
  return reply.send(result)
}

export async function updateLoyaltyConfigHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const entries: Record<string, string> = {}
  for (const [key, value] of Object.entries(body)) {
    entries[`loyalty_${key}`] = String(value)
  }
  const result = await settingsService.commands.updateSettings.execute({
    businessId: request.user.businessId,
    settings: entries,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function getLoyaltyActivityHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await settingsService.queries.getLoyaltyActivity.execute({ businessId: request.user.businessId })
  return reply.send(result)
}