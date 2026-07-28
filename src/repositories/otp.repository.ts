import { getDb } from '../databases/index.js'

export const otpRepository = {
  async create(data: {
    userId: string
    code: string
    type: string
    expiresAt: Date
  }) {
    return getDb().otp.create({ data })
  },

  async findValid(userId: string, code: string, type: string) {
    return getDb().otp.findFirst({
      where: {
        userId,
        code,
        type,
        used: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async markUsed(id: string) {
    return getDb().otp.update({ where: { id }, data: { used: true } })
  },

  async invalidateUserOtps(userId: string, type: string) {
    return getDb().otp.updateMany({
      where: { userId, type, used: false },
      data: { used: true },
    })
  },
}
