import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export function validateBody<T>(schema: z.ZodType<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const result = schema.safeParse(request.body)
    if (!result.success) {
      return reply.status(400).send({
        error: 'Validation failed',
        details: result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      })
    }
    request.body = result.data
  }
}

export function validateQuery<T>(schema: z.ZodType<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const result = schema.safeParse(request.query)
    if (!result.success) {
      return reply.status(400).send({
        error: 'Invalid query parameters',
        details: result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      })
    }
  }
}

export function sanitizeInput(value: unknown): unknown {
  if (typeof value === 'string') return value.trim().replace(/<[^>]*>/g, '')
  if (Array.isArray(value)) return value.map(sanitizeInput)
  if (value && typeof value === 'object') {
    const sanitized: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      sanitized[k] = sanitizeInput(v)
    }
    return sanitized
  }
  return value
}
