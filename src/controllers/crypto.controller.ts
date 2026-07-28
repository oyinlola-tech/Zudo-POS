import type { FastifyRequest, FastifyReply } from 'fastify'
import { cryptoService } from '../services/index.js'
import { cryptoWalletSchema } from '../validators/index.js'
import type { GenerateQrResponse, WalletsResponse } from '../dtos/index.js'

export async function generateQrHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<GenerateQrResponse | { error: string }> {
  if (!request.user || !request.user.businessId) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  const { currency, amount, saleId } = request.body as {
    currency: string
    amount: number
    saleId?: string
  }
  if (!currency || !amount) {
    return reply.status(400).send({ error: 'currency and amount required' })
  }

  try {
    const result = await cryptoService.commands.generatePaymentQr.execute({
      businessId: request.user.businessId,
      currency,
      amount,
      saleId,
    })
    return reply.send(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'QR generation failed'
    return reply.status(400).send({ error: msg })
  }
}

export async function getWalletsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<WalletsResponse> {
  if (!request.user || !request.user.businessId) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  const wallets = await cryptoService.queries.getWallets.execute({
    businessId: request.user.businessId,
  })
  return reply.send({ wallets })
}

export async function upsertWalletHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.user || !request.user.businessId) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  const parsed = cryptoWalletSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    })
  }

  const result = await cryptoService.queries.upsertWallet.execute({
    businessId: request.user.businessId,
    ...parsed.data,
  })
  return reply.send(result)
}

export async function confirmPaymentHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { paymentId, txHash } = request.body as {
    paymentId: string
    txHash: string
  }
  if (!paymentId || !txHash) {
    return reply.status(400).send({ error: 'paymentId and txHash required' })
  }

  try {
    const result = await cryptoService.commands.confirmCryptoPayment.execute({
      paymentId,
      txHash,
    })
    return reply.send(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Confirmation failed'
    return reply.status(400).send({ error: msg })
  }
}

export async function adminChangeStaffPinHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })
  const roles = ['OWNER', 'ADMIN', 'MANAGER']
  if (!roles.includes(request.user.role)) {
    return reply.status(403).send({ error: 'Forbidden' })
  }

  const { adminChangeStaffPinSchema } = await import('../validators/index.js')
  const parsed = adminChangeStaffPinSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    })
  }

  const { authService } = await import('../services/index.js')
  try {
    const result = await authService.commands.adminChangeStaffPin.execute({
      adminId: request.user.userId,
      ...parsed.data,
    })
    return reply.send(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Change staff PIN failed'
    return reply.status(400).send({ error: msg })
  }
}