import type { FastifyRequest, FastifyReply } from 'fastify'
import { billingService } from '../services/index.js'

export async function changePlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as { businessId?: string; plan?: string }
  if (!body.businessId || !body.plan) return reply.status(400).send({ error: 'businessId and plan are required' })
  try {
    const result = await billingService.commands.changePlan.execute({ businessId: body.businessId, plan: body.plan })
    return reply.send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Change plan failed' })
  }
}

export async function generateInvoiceHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as { businessId?: string; amount?: number; description?: string }
  if (!body.businessId || body.amount == null || !body.description) {
    return reply.status(400).send({ error: 'businessId, amount, and description are required' })
  }
  try {
    const result = await billingService.commands.generateInvoice.execute({
      businessId: body.businessId, amount: body.amount, description: body.description,
    })
    return reply.status(201).send(result)
  } catch (err) {
    return reply.status(400).send({ error: err instanceof Error ? err.message : 'Invoice generation failed' })
  }
}

export async function billingGetPlanHandler(request: FastifyRequest, reply: FastifyReply) {
  const { businessId } = request.params as { businessId: string }
  const result = await billingService.queries.getPlan.execute({ businessId })
  if (!result) return reply.status(404).send({ error: 'Business not found' })
  return reply.send(result)
}
