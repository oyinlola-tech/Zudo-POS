import { getDb } from '../databases/index.js';
export const shiftRepository = {
    async create(data) {
        return getDb().shift.create({
            data: {
                userId: data.userId,
                businessId: data.businessId,
                startCash: data.startCash,
            },
        });
    },
    async findActiveByUser(userId) {
        return getDb().shift.findFirst({
            where: { userId, status: 'OPEN' },
            orderBy: { startedAt: 'desc' },
        });
    },
    async findById(id) {
        return getDb().shift.findUnique({ where: { id } });
    },
    async close(id, endCash, notes) {
        const shift = await getDb().shift.findUnique({ where: { id } });
        if (!shift)
            throw new Error('Shift not found');
        const expectedCash = shift.startCash + endCash;
        const cashDiff = endCash - expectedCash;
        return getDb().shift.update({
            where: { id },
            data: {
                endedAt: new Date(),
                endCash,
                expectedCash,
                cashDiff,
                status: 'CLOSED',
                notes,
            },
        });
    },
    async findByUser(userId) {
        return getDb().shift.findMany({
            where: { userId },
            orderBy: { startedAt: 'desc' },
            take: 50,
        });
    },
    async findByBusiness(businessId) {
        return getDb().shift.findMany({
            where: { businessId },
            orderBy: { startedAt: 'desc' },
            take: 100,
            include: { user: true },
        });
    },
};
//# sourceMappingURL=shift.repository.js.map