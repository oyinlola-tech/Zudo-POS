import { getDb } from '../databases/index.js';
export const productRepository = {
    async findByBusiness(businessId, options) {
        const where = { businessId, isActive: true };
        if (options?.category)
            where['category'] = options.category;
        if (options?.search) {
            where['OR'] = [
                { name: { contains: options.search } },
                { sku: { contains: options.search } },
                { barcode: { contains: options.search } },
            ];
        }
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 50;
        const [items, total] = await Promise.all([
            getDb().product.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            getDb().product.count({ where }),
        ]);
        return { items, total, page, limit };
    },
    async findById(id) {
        return getDb().product.findUnique({ where: { id } });
    },
    async create(data) {
        return getDb().product.create({ data });
    },
    async update(id, data) {
        return getDb().product.update({ where: { id }, data });
    },
    async remove(id) {
        return getDb().product.update({ where: { id }, data: { isActive: false } });
    },
    async getInventoryStats(businessId) {
        const [total, lowStock, outOfStock] = await Promise.all([
            getDb().product.count({ where: { businessId, isActive: true } }),
            getDb().product.count({ where: { businessId, isActive: true, stock: { lte: getDb().product.fields.lowStockQty }, NOT: { stock: 0 } } }),
            getDb().product.count({ where: { businessId, isActive: true, stock: 0 } }),
        ]);
        return { total, lowStock, outOfStock };
    },
};
//# sourceMappingURL=product.repository.js.map