import type { FastifyRequest, FastifyReply } from 'fastify'
import { shiftService } from '../services/index.js'
import { startShiftSchema, endShiftSchema } from '../validators/index.js'
import type { ActiveShiftResponse, ShiftHistoryResponse } from '../dtos/index.js'

export async function startShiftHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })
  if (!request.user.businessId) {
    return reply.status(400).send({ error: 'No business assigned' })
  }

  const parsed = startShiftSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    })
  }

  try {
    const result = await shiftService.commands.startShift.execute({
      userId: request.user.userId,
      businessId: request.user.businessId,
      ...parsed.data,
    })
    return reply.send(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Start shift failed'
    return reply.status(400).send({ error: message })
  }
}

export async function endShiftHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })

  const parsed = endShiftSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    })
  }

  try {
    const result = await shiftService.commands.endShift.execute({
      userId: request.user.userId,
      ...parsed.data,
    })
    return reply.send(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'End shift failed'
    return reply.status(400).send({ error: message })
  }
}

export async function activeShiftHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ActiveShiftResponse | { error: string }> {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })

  const shift = await shiftService.queries.getActiveShift.execute({
    userId: request.user.userId,
  })
  return reply.send({ shift })
}

export async function shiftHistoryHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ShiftHistoryResponse | { error: string }> {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })

  const history = await shiftService.queries.getShiftHistory.execute({
    userId: request.user.userId,
  })
  return reply.send({ history })
}
