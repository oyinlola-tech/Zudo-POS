import { getDb } from '../databases/index.js';
export const saleRepository = {
    async create(data) {
        return getDb().$transaction(async (tx) => {
            const count = await tx.sale.count({ where: { businessId: data.businessId } });
            const reference = `ZUDO-${Date.now().toString(36).toUpperCase()}-${(count + 1).toString().padStart(4, '0')}`;
            const sale = await tx.sale.create({
                data: {
                    businessId: data.businessId,
                    userId: data.userId,
                    shiftId: data.shiftId,
                    customerId: data.customerId,
                    reference,
                    subtotal: data.subtotal,
                    discount: data.discount ?? 0,
                    tax: data.tax ?? 0,
                    total: data.total,
                    paymentMethod: data.paymentMethod,
                    notes: data.notes,
                    items: {
                        create: data.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            total: item.total,
                        })),
                    },
                },
                include: { items: true },
            });
            for (const item of data.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }
            if (data.customerId) {
                const pointsEarned = Math.floor(data.total / 100);
                const customer = await tx.customer.findUnique({ where: { id: data.customerId } });
                const totalPoints = (customer?.points ?? 0) + pointsEarned;
                const tier = totalPoints >= 1000 ? 'PLATINUM' : totalPoints >= 500 ? 'GOLD' : totalPoints >= 100 ? 'SILVER' : 'BRONZE';
                await tx.customer.update({
                    where: { id: data.customerId },
                    data: {
                        totalSpent: { increment: data.total },
                        visitCount: { increment: 1 },
                        lastVisit: new Date(),
                        points: { increment: pointsEarned },
                        loyaltyTier: tier,
                    },
                });
            }
            return sale;
        });
    },
    async findByBusiness(businessId, options) {
        const where = { businessId };
        if (options?.status)
            where['status'] = options.status;
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 50;
        const [items, total] = await Promise.all([
            getDb().sale.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: { items: { include: { product: true } } },
            }),
            getDb().sale.count({ where }),
        ]);
        return { items, total, page, limit };
    },
    async findById(id) {
        return getDb().sale.findUnique({ where: { id }, include: { items: { include: { product: true } } } });
    },
    async voidSale(id) {
        return getDb().$transaction(async (tx) => {
            const sale = await tx.sale.findUnique({ where: { id }, include: { items: true } });
            if (!sale)
                throw new Error('Sale not found');
            if (sale.status === 'VOIDED')
                throw new Error('Sale already voided');
            for (const item of sale.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } },
                });
            }
            return tx.sale.update({ where: { id }, data: { status: 'VOIDED' } });
        });
    },
    async getStats(businessId) {
        const [totalSales, totalRevenue, todaySales] = await Promise.all([
            getDb().sale.count({ where: { businessId, status: 'COMPLETED' } }),
            getDb().sale.aggregate({ where: { businessId, status: 'COMPLETED' }, _sum: { total: true } }),
            getDb().sale.count({
                where: {
                    businessId,
                    status: 'COMPLETED',
                    createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
                },
            }),
        ]);
        return { totalSales, totalRevenue: totalRevenue._sum.total ?? 0, todaySales };
    },
};
//# sourceMappingURL=sale.repository.js.map