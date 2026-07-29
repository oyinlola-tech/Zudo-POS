import 'dotenv/config'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from './cores/logger/index.js'
import { registerPageRoutes, registerAuthRoutes, registerShiftRoutes, registerCryptoRoutes, registerPublicRoutes, registerProductRoutes, registerSaleRoutes, registerCustomerRoutes, registerStaffRoutes, registerAnalyticsRoutes, registerSettingsRoutes, registerReturnsRoutes, registerAdminRoutes, registerAuditLogRoutes, registerRolesRoutes, registerBillingPlansRoutes, registerNotificationRoutes
} from './routes/index.js'
import { getDb } from './databases/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env['JWT_SECRET']) {
  logger.error('JWT_SECRET environment variable is required')
  process.exit(1)
}

const ALLOWED_ORIGINS = (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000').split(',').map(s => s.trim())

const fastify = Fastify({
  logger: true,
  bodyLimit: 1024 * 1024,
})

await fastify.register(rateLimit, {
  global: true,
  max: 100,
  timeWindow: '1 minute',
})

await fastify.register(cors, {
  origin: ALLOWED_ORIGINS,
  credentials: true,
})

await fastify.register(helmet, {
  contentSecurityPolicy: false,
})

fastify.register(cookie)

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/',
  decorateReply: false,
})

fastify.get('/api/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))

fastify.setNotFoundHandler((_req, reply) => {
  reply.code(404).sendFile('404.html')
})

const authEndpoints = ['/api/auth/login', '/api/auth/register', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/send-otp', '/api/auth/verify-otp', '/api/auth/forgot-pin']
fastify.addHook('onRoute', (routeOptions) => {
  if (authEndpoints.includes(routeOptions.url as string)) {
    routeOptions.config = { ...routeOptions.config, rateLimit: { max: 10, timeWindow: '1 minute' } }
  }
})

fastify.register(registerPageRoutes)
fastify.register(registerAuthRoutes)
fastify.register(registerShiftRoutes)
fastify.register(registerCryptoRoutes)
fastify.register(registerPublicRoutes)
fastify.register(registerProductRoutes)
fastify.register(registerSaleRoutes)
fastify.register(registerCustomerRoutes)
fastify.register(registerStaffRoutes)
fastify.register(registerAnalyticsRoutes)
fastify.register(registerSettingsRoutes)
fastify.register(registerReturnsRoutes)
fastify.register(registerAdminRoutes)
fastify.register(registerAuditLogRoutes)
fastify.register(registerRolesRoutes)
fastify.register(registerBillingPlansRoutes)
fastify.register(registerNotificationRoutes)

const start = async () => {
  try {
    const port = parseInt(process.env['PORT'] ?? '3000', 10)

    if (process.env['SEED_SUPERADMIN'] === 'true') {
      const superadminEmail = process.env['SUPERADMIN_EMAIL'] ?? 'admin@zudo.app'
      const superadminPassword = process.env['SUPERADMIN_PASSWORD'] ?? ''
      const superadminPin = process.env['SUPERADMIN_PIN'] ?? '0000'
      if (!superadminPassword) {
        logger.warn('SUPERADMIN_PASSWORD not set, using default password. Set SEED_SUPERADMIN=false to disable.')
      }
      const existing = await getDb().user.findUnique({ where: { email: superadminEmail } })
      if (!existing) {
        const passwordHash = await bcrypt.hash(superadminPassword || 'Admin@12345', 12)
        const pinHash = await bcrypt.hash(superadminPin, 10)
        await getDb().user.create({
          data: {
            email: superadminEmail,
            passwordHash,
            pinHash,
            firstName: 'Super',
            lastName: 'Admin',
            role: 'SUPERADMIN',
            isActive: true,
            emailVerified: true,
          },
        })
        logger.info(`Superadmin seeded: ${superadminEmail}`)
      }
    }

    await fastify.listen({ port })
    logger.info(`Zudo POS server running at http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...')
  await fastify.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  logger.info('Shutting down gracefully...')
  await fastify.close()
  process.exit(0)
})

start()