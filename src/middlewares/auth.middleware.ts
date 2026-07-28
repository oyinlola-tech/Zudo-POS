import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyToken } from '../utils/index.js'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string
      email: string
      role: string
      businessId: string | null
    }
  }
}

export async function authGuard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const header = request.headers['authorization']
  if (!header || !header.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const token = header.slice(7)
  try {
    request.user = verifyToken(token)
  } catch {
    return reply.status(401).send({ error: 'Invalid or expired token' })
  }
}

export function roleGuard(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return reply.status(403).send({ error: 'Forbidden' })
    }
  }
}
