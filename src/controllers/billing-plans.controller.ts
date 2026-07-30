import type { FastifyRequest, FastifyReply } from 'fastify'
import { billingPlansService } from '../services/index.js'

export async function listPlansHandler(_request: FastifyRequest, reply: FastifyReply) {
  const result = await billingPlansService.queries.listPlans.execute()
  return reply.send(result)
}

export async function getPlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  try {
    const result = await billingPlansService.queries.getPlan.execute({ planId: id })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Plan not found' })
  }
}

export async function createPlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as Record<string, unknown>
  const result = await billingPlansService.commands.createPlan.execute(body)
  return reply.send(result)
}

export async function updatePlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await billingPlansService.commands.updatePlan.execute({ planId: id, data: body })
  return reply.send(result)
}

export async function billingPlanListInvoicesHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await billingPlansService.queries.listInvoices.execute({
    businessId: request.user.businessId,
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function billingPlanGetInvoiceHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const result = await billingPlansService.queries.getInvoice.execute({ invoiceId: id })
  return reply.send(result)
}

export async function getSubscriptionStatsHandler(_request: FastifyRequest, reply: FastifyReply) {
  const result = await billingPlansService.queries.getSubscriptionStats.execute()
  return reply.send(result)
}