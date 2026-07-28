import { getDb } from '../databases/index.js';
export const customerRepository = {
    async findByBusiness(businessId, options) {
        const where = { businessId };
        if (options?.search) {
            where['OR'] = [
                { firstName: { contains: options.search } },
                { lastName: { contains: options.search } },
                { phone: { contains: options.search } },
                { email: { contains: options.search } },
            ];
        }
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 50;
        const [items, total] = await Promise.all([
            getDb().customer.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            getDb().customer.count({ where }),
        ]);
        return { items, total, page, limit };
    },
    async findById(id, businessId) {
        return getDb().customer.findFirst({ where: { id, businessId } });
    },
    async findByEmail(businessId, email) {
        return getDb().customer.findFirst({ where: { businessId, email } });
    },
    async create(data) {
        return getDb().customer.create({ data });
    },
    async update(id, businessId, data) {
        return getDb().customer.update({ where: { id }, data });
    },
    async remove(id) {
        return getDb().customer.update({ where: { id }, data: { isActive: false } });
    },
    async getStats(businessId) {
        const now = new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const [total, newThisMonth, highValue] = await Promise.all([
            getDb().customer.count({ where: { businessId, isActive: true } }),
            getDb().customer.count({ where: { businessId, createdAt: { gte: firstOfMonth } } }),
            getDb().customer.count({ where: { businessId, totalSpent: { gte: 50000 } } }),
        ]);
        const avgSpendAgg = await getDb().customer.aggregate({
            where: { businessId, isActive: true },
            _avg: { totalSpent: true },
        });
        return {
            total,
            newThisMonth,
            highValueSegment: highValue,
            avgSpend: avgSpendAgg._avg.totalSpent ?? 0,
        };
    },
};
//# sourceMappingURL=customer.repository.js.map