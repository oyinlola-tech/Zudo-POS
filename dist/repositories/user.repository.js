import { getDb } from '../databases/index.js';
const userInclude = { business: true };
export const userRepository = {
    async create(data) {
        return getDb().user.create({ data, include: userInclude });
    },
    async findByEmail(email) {
        return getDb().user.findUnique({
            where: { email },
            include: userInclude,
        });
    },
    async findById(id) {
        return getDb().user.findUnique({
            where: { id },
            include: userInclude,
        });
    },
    async update(id, data) {
        return getDb().user.update({ where: { id }, data, include: userInclude });
    },
    async updateLastLogin(id) {
        return getDb().user.update({
            where: { id },
            data: { lastLoginAt: new Date() },
        });
    },
};
//# sourceMappingURL=user.repository.js.map