import { userRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import bcrypt from 'bcryptjs'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateStaffInput = {
  businessId: string
  firstName: string; lastName: string; email: string
  password: string; role: string; phone?: string
  userId?: string; ip?: string; userAgent?: string
}

export class CreateStaffCommand implements ICommand<CreateStaffInput, Record<string, unknown>> {
  async execute(input: CreateStaffInput) {
    const { userId, ip, userAgent, ...data } = input
    const existing = await userRepository.findByEmail(data.email)
    if (existing) throw new Error('Email already in use')

    const passwordHash = await bcrypt.hash(data.password, 12)
    const pinHash = await bcrypt.hash('0000', 10)

    const staff = await userRepository.create({
      business: { connect: { id: data.businessId } },
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      passwordHash,
      pinHash,
      role: data.role as 'ADMIN' | 'MANAGER' | 'CASHIER',
      isActive: true,
      emailVerified: true,
    })

    if (userId) {
      await createAuditLog({ userId, action: 'USER_CREATE', entity: 'Staff', entityId: staff.id, details: `Created staff: ${staff.firstName} ${staff.lastName} (${staff.role})`, ip, userAgent })
    }

    const { passwordHash: _, pinHash: __, ...safe } = staff
    return safe
  }
}