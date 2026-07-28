import { getDb } from '../databases/index.js'

export const staffRepository = {
  async findByBusiness(businessId: string, options?: { search?: string; page?: number; limit?: number }) {
    const where: Record<string, unknown> = { businessId, role: { not: 'SUPERADMIN' } }
    if (options?.search) {
      where['OR'] = [
        { firstName: { contains: options.search } },
        { lastName: { contains: options.search } },
        { email: { contains: options.search } },
      ]
    }
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const [items, total] = await Promise.all([
      getDb().user.findMany({
        where,
        select: { id: true, firstName: true, lastName: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true, phone: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      getDb().user.count({ where }),
    ])
    return { items, total, page, limit }
  },

  async findById(id: string, businessId: string) {
    return getDb().user.findFirst({
      where: { id, businessId },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true, updatedAt: true, phone: true },
    })
  },
}