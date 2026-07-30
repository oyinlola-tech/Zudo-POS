import { getDb } from '../databases/index.js'
import type { TaxType } from '@prisma/client'

export const taxRepository = {
  async create(data: { businessId: string; name: string; rate: number; type?: TaxType }) {
    return getDb().tax.create({ data: data as never })
  },

  async update(id: string, data: { name?: string; rate?: number; type?: TaxType; isActive?: boolean }) {
    return getDb().tax.update({ where: { id }, data: data as never })
  },

  async delete(id: string) {
    return getDb().tax.update({ where: { id }, data: { isActive: false } })
  },

  async findById(id: string) {
    return getDb().tax.findUnique({ where: { id } })
  },

  async findByBusiness(businessId: string) {
    return getDb().tax.findMany({ where: { businessId }, orderBy: { name: 'asc' } })
  },
}
