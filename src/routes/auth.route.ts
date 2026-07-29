import type { FastifyInstance } from 'fastify'
import type { FastifyRequest, FastifyReply } from 'fastify'
import {
  registerHandler,
  loginHandler,
  sessionHandler,
  profileHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  changePasswordHandler,
  sendOtpHandler,
  verifyOtpHandler,
  setupPinHandler,
  changePinHandler,
  forgotPinHandler,
} from '../controllers/auth.controller.js'
import { authGuard } from '../middlewares/auth.middleware.js'

async function updateProfileHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })
  return reply.send({ message: 'Profile updated' })
}

async function onboardingStubHandler(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({ message: 'Saved' })
}

export async function registerAuthRoutes(fastify: FastifyInstance) {
  fastify.post('/api/auth/register', registerHandler)
  fastify.post('/api/auth/login', loginHandler)

  fastify.post('/api/auth/forgot-password', forgotPasswordHandler)
  fastify.post('/api/auth/reset-password', resetPasswordHandler)
  fastify.post('/api/auth/send-otp', sendOtpHandler)
  fastify.post('/api/auth/verify-otp', verifyOtpHandler)
  fastify.post('/api/auth/forgot-pin', forgotPinHandler)

  fastify.get('/api/auth/session', { preHandler: [authGuard] }, sessionHandler)
  fastify.get('/api/auth/profile', { preHandler: [authGuard] }, profileHandler)
  fastify.put('/api/auth/profile', { preHandler: [authGuard] }, updateProfileHandler)

  fastify.post('/api/auth/setup/store', { preHandler: [authGuard] }, onboardingStubHandler)
  fastify.post('/api/auth/setup/staff', { preHandler: [authGuard] }, onboardingStubHandler)
  fastify.post('/api/auth/setup/products', { preHandler: [authGuard] }, onboardingStubHandler)
  fastify.post('/api/auth/setup/features', { preHandler: [authGuard] }, onboardingStubHandler)
  fastify.post('/api/auth/setup/complete', { preHandler: [authGuard] }, onboardingStubHandler)

  fastify.post('/api/auth/change-password', { preHandler: [authGuard] }, changePasswordHandler)
  fastify.post('/api/auth/setup-pin', { preHandler: [authGuard] }, setupPinHandler)
  fastify.post('/api/auth/change-pin', { preHandler: [authGuard] }, changePinHandler)
}
