import { getDb } from '../databases/index.js'
import type { Prisma } from '@prisma/client'

const userInclude = { business: true } satisfies Prisma.UserInclude

export const userRepository = {
  async create(data: Prisma.UserCreateInput) {
    return getDb().user.create({ data, include: userInclude })
  },

  async findByEmail(email: string) {
    return getDb().user.findUnique({
      where: { email },
      include: userInclude,
    })
  },

  async findById(id: string) {
    return getDb().user.findUnique({
      where: { id },
      include: userInclude,
    })
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return getDb().user.update({ where: { id }, data, include: userInclude })
  },

  async updateLastLogin(id: string) {
    return getDb().user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    })
  },
}
