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
import { getDb } from '../databases/index.js'
import bcrypt from 'bcryptjs'

async function updateProfileHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })
  return reply.send({ message: 'Profile updated' })
}

async function onboardStoreHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.userId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, string>
  const businessId = request.user.businessId
  if (!businessId) return reply.status(400).send({ error: 'No business assigned' })
  const entries: Record<string, string> = {
    store_name: body.name ?? '',
    store_address: body.address ?? '',
    store_phone: body.phone ?? '',
    store_currency: body.currency ?? 'NGN',
  }
  for (const [key, value] of Object.entries(entries)) {
    await getDb().businessSetting.upsert({
      where: { businessId_key: { businessId, key } },
      update: { value },
      create: { businessId, key, value },
    })
  }
  return reply.send({ message: 'Store saved' })
}

async function onboardStaffHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const staffList = body['staff'] as Array<Record<string, string>> | undefined
  if (!staffList) return reply.status(400).send({ error: 'staff array required' })
  for (const member of staffList) {
    const passwordHash = await bcrypt.hash(member.password || 'Staff@12345', 12)
    await getDb().user.create({
      data: {
        email: member.email ?? `${Date.now()}@onboard.zudo`,
        passwordHash,
        firstName: member.firstName ?? '',
        lastName: member.lastName ?? '',
        role: (member.role?.toUpperCase() as 'CASHIER' | 'MANAGER') ?? 'CASHIER',
        businessId: request.user.businessId,
        isActive: true,
      },
    })
  }
  return reply.send({ message: 'Staff saved', count: staffList.length })
}

async function onboardProductsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const products = body['products'] as Array<Record<string, unknown>> | undefined
  if (!products) return reply.status(400).send({ error: 'products array required' })
  for (const item of products) {
    await getDb().product.create({
      data: {
        businessId: request.user.businessId,
        name: String(item.name ?? ''),
        price: Number(item.price ?? 0),
        sku: item.sku ? String(item.sku) : undefined,
        stock: item.stock ? Number(item.stock) : 0,
        category: item.category ? String(item.category) : undefined,
      },
    })
  }
  return reply.send({ message: 'Products saved', count: products.length })
}

async function onboardFeaturesHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const features = body['features'] as Record<string, boolean> | undefined
  if (!features) return reply.send({ message: 'No features to save' })
  for (const [key, value] of Object.entries(features)) {
    await getDb().businessSetting.upsert({
      where: { businessId_key: { businessId: request.user.businessId, key: `feature_${key}` } },
      update: { value: String(value) },
      create: { businessId: request.user.businessId, key: `feature_${key}`, value: String(value) },
    })
  }
  return reply.send({ message: 'Features saved' })
}

async function onboardCompleteHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  await getDb().businessSetting.upsert({
    where: { businessId_key: { businessId: request.user.businessId, key: 'onboarding_complete' } },
    update: { value: 'true' },
    create: { businessId: request.user.businessId, key: 'onboarding_complete', value: 'true' },
  })
  return reply.send({ message: 'Onboarding complete' })
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

  fastify.post('/api/auth/setup/store', { preHandler: [authGuard] }, onboardStoreHandler)
  fastify.post('/api/auth/setup/staff', { preHandler: [authGuard] }, onboardStaffHandler)
  fastify.post('/api/auth/setup/products', { preHandler: [authGuard] }, onboardProductsHandler)
  fastify.post('/api/auth/setup/features', { preHandler: [authGuard] }, onboardFeaturesHandler)
  fastify.post('/api/auth/setup/complete', { preHandler: [authGuard] }, onboardCompleteHandler)

  fastify.post('/api/auth/change-password', { preHandler: [authGuard] }, changePasswordHandler)
  fastify.post('/api/auth/setup-pin', { preHandler: [authGuard] }, setupPinHandler)
  fastify.post('/api/auth/change-pin', { preHandler: [authGuard] }, changePinHandler)
}
