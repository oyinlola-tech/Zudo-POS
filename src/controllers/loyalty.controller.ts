import type { FastifyRequest, FastifyReply } from 'fastify'
import { loyaltyService } from '../services/index.js'

export async function listLoyaltyHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await loyaltyService.queries.list.execute({
    businessId: request.user.businessId,
    tier: query['tier'],
    search: query['search'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getLoyaltyHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const result = await loyaltyService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!result) return reply.status(404).send({ error: 'Loyalty member not found' })
  return reply.send(result)
}

export async function updateLoyaltyTierHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as { tier?: string }
  if (!body.tier) return reply.status(400).send({ error: 'tier is required' })
  try {
    const result = await loyaltyService.commands.updateTier.execute({ id, businessId: request.user.businessId, tier: body.tier })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Update failed' })
  }
}
