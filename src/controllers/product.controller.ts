import type { FastifyRequest, FastifyReply } from 'fastify'
import { productService } from '../services/index.js'

export async function listProductsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as Record<string, string | undefined>
  const result = await productService.queries.list.execute({
    businessId: request.user.businessId,
    category: query['category'],
    search: query['search'],
    page: query['page'] ? parseInt(query['page']) : 1,
    limit: query['limit'] ? parseInt(query['limit']) : 50,
  })
  return reply.send(result)
}

export async function getProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const product = await productService.queries.get.execute({ id })
  if (!product) return reply.status(404).send({ error: 'Product not found' })
  return reply.send(product)
}

export async function createProductHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const body = request.body as Record<string, unknown>
  const result = await productService.commands.create.execute({
    businessId: request.user.businessId,
    name: body['name'] as string,
    price: body['price'] as number,
    sku: body['sku'] as string | undefined,
    barcode: body['barcode'] as string | undefined,
    description: body['description'] as string | undefined,
    costPrice: body['costPrice'] as number | undefined,
    stock: body['stock'] as number | undefined,
    lowStockQty: body['lowStockQty'] as number | undefined,
    category: body['category'] as string | undefined,
    image: body['image'] as string | undefined,
    userId: request.user.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.status(201).send(result)
}

export async function updateProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const body = request.body as Record<string, unknown>
  const result = await productService.commands.update.execute({
    id,
    ...body,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function deleteProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const result = await productService.commands.delete.execute({
    id,
    userId: request.user?.userId,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  })
  return reply.send(result)
}

export async function searchProductsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const query = request.query as { q?: string }
  const result = await productService.queries.search.execute({ businessId: request.user.businessId, q: query.q ?? '' })
  return reply.send(result)
}

export async function inventoryStatsHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.businessId) return reply.status(401).send({ error: 'Unauthorized' })
  const result = await productService.queries.inventoryStats.execute({ businessId: request.user.businessId })
  return reply.send(result)
}