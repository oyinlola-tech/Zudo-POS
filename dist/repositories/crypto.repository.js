import { getDb } from '../databases/index.js';
export const cryptoRepository = {
    async getWallets(businessId) {
        return getDb().businessCryptoWallet.findMany({
            where: { businessId, isActive: true },
        });
    },
    async upsertWallet(data) {
        return getDb().businessCryptoWallet.upsert({
            where: {
                businessId_currency: {
                    businessId: data.businessId,
                    currency: data.currency,
                },
            },
            update: { address: data.address, network: data.network },
            create: { ...data },
        });
    },
    async createPayment(data) {
        return getDb().cryptoPayment.create({ data });
    },
    async updatePayment(id, data) {
        return getDb().cryptoPayment.update({ where: { id }, data });
    },
};
//# sourceMappingURL=crypto.repository.js.map