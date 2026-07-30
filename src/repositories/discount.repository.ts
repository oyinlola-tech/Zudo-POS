import { getDb } from '../databases/index.js'
import type { DiscountType } from '@prisma/client'

export const discountRepository = {
  async create(data: { businessId: string; name: string; type: DiscountType; value: number; minPurchase?: number; startsAt?: Date; endsAt?: Date }) {
    return getDb().discount.create({ data: data as never })
  },

  async update(id: string, data: { name?: string; type?: DiscountType; value?: number; minPurchase?: number; isActive?: boolean; startsAt?: Date; endsAt?: Date }) {
    return getDb().discount.update({ where: { id }, data: data as never })
  },

  async delete(id: string) {
    return getDb().discount.update({ where: { id }, data: { isActive: false } })
  },

  async findById(id: string) {
    return getDb().discount.findUnique({ where: { id } })
  },

  async findByBusiness(businessId: string) {
    return getDb().discount.findMany({ where: { businessId }, orderBy: { name: 'asc' } })
  },
}
