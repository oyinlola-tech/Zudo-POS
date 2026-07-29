import type { FastifyInstance } from 'fastify'
import { authGuard } from '../middlewares/auth.middleware.js'
import {
  generateQrHandler,
  getWalletsHandler,
  upsertWalletHandler,
  confirmPaymentHandler,
  adminChangeStaffPinHandler,
} from '../controllers/crypto.controller.js'

export async function registerCryptoRoutes(fastify: FastifyInstance) {
  fastify.post('/api/crypto/generate-qr', { preHandler: [authGuard] }, generateQrHandler)
  fastify.get('/api/crypto/wallets', { preHandler: [authGuard] }, getWalletsHandler)
  fastify.post('/api/crypto/wallets', { preHandler: [authGuard] }, upsertWalletHandler)
  fastify.post('/api/crypto/confirm', { preHandler: [authGuard] }, confirmPaymentHandler)

  fastify.post(
    '/api/auth/admin-change-staff-pin',
    { preHandler: [authGuard] },
    adminChangeStaffPinHandler,
  )
}