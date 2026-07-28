import { saleService } from '../services/index.js';
export async function createSaleHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    if (!request.user?.userId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const body = request.body;
    const result = await saleService.commands.create.execute({
        businessId: request.user.businessId,
        userId: request.user.userId,
        subtotal: body['subtotal'],
        total: body['total'],
        items: body['items'],
        discount: body['discount'],
        tax: body['tax'],
        paymentMethod: body['paymentMethod'],
        notes: body['notes'],
        shiftId: body['shiftId'],
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    });
    return reply.status(201).send(result);
}
export async function listSalesHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const query = request.query;
    const result = await saleService.queries.list.execute({
        businessId: request.user.businessId,
        page: query['page'] ? parseInt(query['page']) : 1,
        limit: query['limit'] ? parseInt(query['limit']) : 50,
        status: query['status'],
    });
    return reply.send(result);
}
export async function getSaleHandler(request, reply) {
    const { id } = request.params;
    const sale = await saleService.queries.get.execute({ id });
    if (!sale)
        return reply.status(404).send({ error: 'Sale not found' });
    return reply.send(sale);
}
export async function voidSaleHandler(request, reply) {
    const { id } = request.params;
    try {
        const result = await saleService.commands.void.execute({
            id,
            userId: request.user?.userId,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
        });
        return reply.send(result);
    }
    catch (err) {
        return reply.status(400).send({ error: err instanceof Error ? err.message : 'Void failed' });
    }
}
export async function saleStatsHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const result = await saleService.queries.stats.execute({ businessId: request.user.businessId });
    return reply.send(result);
}
//# sourceMappingURL=sale.controller.js.map