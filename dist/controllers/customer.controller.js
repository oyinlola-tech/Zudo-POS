import { customerService } from '../services/index.js';
export async function listCustomersHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const query = request.query;
    const result = await customerService.queries.list.execute({
        businessId: request.user.businessId,
        search: query['search'],
        page: query['page'] ? parseInt(query['page']) : 1,
        limit: query['limit'] ? parseInt(query['limit']) : 50,
    });
    return reply.send(result);
}
export async function getCustomerHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const { id } = request.params;
    const customer = await customerService.queries.get.execute({ id, businessId: request.user.businessId });
    if (!customer)
        return reply.status(404).send({ error: 'Customer not found' });
    return reply.send(customer);
}
export async function createCustomerHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const body = request.body;
    const result = await customerService.commands.create.execute({
        businessId: request.user.businessId,
        firstName: body['firstName'],
        lastName: body['lastName'],
        email: body['email'],
        phone: body['phone'],
        address: body['address'],
        notes: body['notes'],
        userId: request.user?.userId,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    });
    return reply.status(201).send(result);
}
export async function updateCustomerHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const { id } = request.params;
    const body = request.body;
    const result = await customerService.commands.update.execute({
        id,
        businessId: request.user.businessId,
        firstName: body['firstName'],
        lastName: body['lastName'],
        email: body['email'],
        phone: body['phone'],
        address: body['address'],
        notes: body['notes'],
        userId: request.user?.userId,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
    });
    return reply.send(result);
}
export async function customerStatsHandler(request, reply) {
    if (!request.user?.businessId)
        return reply.status(401).send({ error: 'Unauthorized' });
    const result = await customerService.queries.stats.execute({ businessId: request.user.businessId });
    return reply.send(result);
}
//# sourceMappingURL=customer.controller.js.map