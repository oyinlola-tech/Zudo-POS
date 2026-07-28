import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { authGuard } from '../middlewares/auth.middleware.js'

export const authPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.decorate('authenticate', authGuard)
})

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: typeof authGuard
  }
}
