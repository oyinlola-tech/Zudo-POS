import type { FastifyRequest, FastifyReply } from 'fastify'
import { expenseService } from '../services/index.js'

export async function listExpensesHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await expenseService.queries.list.execute({
    businessId: request.user.businessId,
    category: query['category'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getExpenseHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const expense = await expenseService.queries.get.execute({ id, businessId: request.user.businessId })
  if (!expense) return reply.status(404).send({ error: 'Expense not found' })
  return reply.send(expense)
}

export async function createExpenseHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await expenseService.commands.create.execute({
    businessId: request.user.businessId,
    category: body['category'] as string,
    amount: body['amount'] as number,
    description: body['description'] as string | undefined,
    reference: body['reference'] as string | undefined,
    createdBy: request.user.userId,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateExpenseHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await expenseService.commands.update.execute({
    id,
    businessId: request.user.businessId,
    category: body['category'] as string | undefined,
    amount: body['amount'] as number | undefined,
    description: body['description'] as string | undefined,
    reference: body['reference'] as string | undefined,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function deleteExpenseHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const { id } = request.params as { id: string }
  try {
    const result = await expenseService.commands.delete.execute({
      id, businessId: request.user.businessId,
      userId: request.user?.userId, ip: request.ip, userAgent: request.headers['user-agent'],
    })
    return reply.send(result)
  } catch (err) {
    return reply.status(404).send({ error: err instanceof Error ? err.message : 'Delete failed' })
  }
}
