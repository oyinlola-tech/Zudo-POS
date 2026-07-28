import { getDb } from '../databases/index.js'

export const cryptoRepository = {
  async getWallets(businessId: string) {
    return getDb().businessCryptoWallet.findMany({
      where: { businessId, isActive: true },
    })
  },

  async upsertWallet(data: {
    businessId: string
    currency: string
    address: string
    network?: string
  }) {
    return getDb().businessCryptoWallet.upsert({
      where: {
        businessId_currency: {
          businessId: data.businessId,
          currency: data.currency,
        },
      },
      update: { address: data.address, network: data.network },
      create: { ...data },
    })
  },

  async createPayment(data: {
    businessId: string
    saleId?: string
    currency: string
    amount: number
    amountUsd?: number
    walletAddress: string
  }) {
    return getDb().cryptoPayment.create({ data })
  },

  async updatePayment(id: string, data: { txHash?: string; status?: string; confirmations?: number; paidAt?: Date }) {
    return getDb().cryptoPayment.update({ where: { id }, data })
  },
}