import { productService } from '../services/index.js';
export async function listProductsHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const query = request.query;
    const result = await productService.queries.list.execute({
        businessId: request.user.businessId,
        category: query['category'],
        search: query['search'],
        page: query['page'] ? parseInt(query['page']) : 1,
        limit: query['limit'] ? parseInt(query['limit']) : 50,
    });
    return reply.send(result);
}
export async function getProductHandler(request, reply) {
    const { id } = request.params;
    const product = await productService.queries.get.execute({ id });
    if (!product)
        return reply.status(404).send({ error: 'Product not found' });
    return reply.send(product);
}
export async function createProductHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const body = request.body;
    const result = await productService.commands.create.execute({
        businessId: request.user.businessId,
        name: body['name'],
        price: body['price'],
        sku: body['sku'],
        barcode: body['barcode'],
        description: body['description'],
        costPrice: body['costPrice'],
        stock: body['stock'],
        lowStockQty: body['lowStockQty'],
        category: body['category'],
        image: body['image'],
        userId: request.user.userId,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    });
    return reply.status(201).send(result);
}
export async function updateProductHandler(request, reply) {
    const { id } = request.params;
    const body = request.body;
    const result = await productService.commands.update.execute({
        id,
        ...body,
        userId: request.user?.userId,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    });
    return reply.send(result);
}
export async function deleteProductHandler(request, reply) {
    const { id } = request.params;
    const result = await productService.commands.delete.execute({
        id,
        userId: request.user?.userId,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    });
    return reply.send(result);
}
export async function searchProductsHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const query = request.query;
    const result = await productService.queries.search.execute({ businessId: request.user.businessId, q: query.q ?? '' });
    return reply.send(result);
}
export async function inventoryStatsHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const result = await productService.queries.inventoryStats.execute({ businessId: request.user.businessId });
    return reply.send(result);
}
//# sourceMappingURL=product.controller.js.map