import type { FastifyRequest, FastifyReply } from 'fastify'
import { mailService } from '../services/index.js'

export async function sendOtpMailHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as { to?: string; code?: string; type?: string; businessName?: string; customerName?: string }
  if (!body.to || !body.code || !body.type) {
    return reply.status(400).send({ error: 'to, code, and type are required' })
  }
  try {
    await mailService.commands.sendOtpMail.execute({
      to: body.to, code: body.code, type: body.type,
      businessName: body.businessName, customerName: body.customerName,
    })
    return reply.send({ message: 'OTP email sent' })
  } catch (err) {
    return reply.status(500).send({ error: err instanceof Error ? err.message : 'Failed to send email' })
  }
}

export async function mailStatusHandler(request: FastifyRequest, reply: FastifyReply) {
  const { messageId } = request.params as { messageId: string }
  const result = await mailService.queries.mailStatus.execute({ messageId })
  return reply.send(result)
}
