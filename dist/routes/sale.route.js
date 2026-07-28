import { createSaleHandler, listSalesHandler, getSaleHandler, voidSaleHandler, saleStatsHandler, } from '../controllers/sale.controller.js';
import { authGuard } from '../middlewares/auth.middleware.js';
export async function registerSaleRoutes(fastify) {
    fastify.post('/api/sales', { preHandler: [authGuard] }, createSaleHandler);
    fastify.get('/api/sales', { preHandler: [authGuard] }, listSalesHandler);
    fastify.get('/api/sales/stats', { preHandler: [authGuard] }, saleStatsHandler);
    fastify.get('/api/sales/:id', { preHandler: [authGuard] }, getSaleHandler);
    fastify.post('/api/sales/:id/void', { preHandler: [authGuard] }, voidSaleHandler);
}
//# sourceMappingURL=sale.route.js.map