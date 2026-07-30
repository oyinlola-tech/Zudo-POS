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

export async function sendCustomEmailHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as { to?: string; subject?: string; text?: string; html?: string }
  if (!body.to || !body.subject || !body.text) {
    return reply.status(400).send({ error: 'to, subject, and text are required' })
  }
  try {
    const result = await mailService.commands.sendCustomEmail.execute({
      to: body.to, subject: body.subject, text: body.text, html: body.html,
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(500).send({ error: err instanceof Error ? err.message : 'Failed to send email' })
  }
}

export async function sendBulkEmailHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as { recipients?: string[]; subject?: string; text?: string; html?: string }
  if (!body.recipients?.length || !body.subject || !body.text) {
    return reply.status(400).send({ error: 'recipients, subject, and text are required' })
  }
  try {
    const result = await mailService.commands.sendBulkEmail.execute({
      recipients: body.recipients, subject: body.subject, text: body.text, html: body.html,
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(500).send({ error: err instanceof Error ? err.message : 'Failed to send bulk email' })
  }
}

export async function emailLogsHandler(_request: FastifyRequest, reply: FastifyReply) {
  const result = await mailService.queries.emailLogs.execute({})
  return reply.send(result)
}
