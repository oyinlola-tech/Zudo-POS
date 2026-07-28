import { getDb } from '../databases/index.js';
export const otpRepository = {
    async create(data) {
        return getDb().otp.create({ data });
    },
    async findValid(userId, code, type) {
        return getDb().otp.findFirst({
            where: {
                userId,
                code,
                type,
                used: false,
                expiresAt: { gte: new Date() },
            },
            orderBy: { createdAt: 'desc' },
        });
    },
    async markUsed(id) {
        return getDb().otp.update({ where: { id }, data: { used: true } });
    },
    async invalidateUserOtps(userId, type) {
        return getDb().otp.updateMany({
            where: { userId, type, used: false },
            data: { used: true },
        });
    },
};
//# sourceMappingURL=otp.repository.js.map