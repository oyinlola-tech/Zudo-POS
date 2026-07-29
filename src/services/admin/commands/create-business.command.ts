import { getDb } from '../../../databases/index.js'
import bcrypt from 'bcryptjs'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateBusinessInput = {
  name: string
  email?: string
  phone?: string
  address?: string
  ownerEmail: string
  ownerPassword?: string
  ownerFirstName: string
  ownerLastName: string
}

export class CreateBusinessCommand implements ICommand<CreateBusinessInput, Record<string, unknown>> {
  async execute(input: CreateBusinessInput) {
    const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36)
    const business = await getDb().business.create({
      data: {
        name: input.name,
        slug,
        email: input.email,
        phone: input.phone,
        address: input.address,
        plan: 'FREE',
        status: 'ACTIVE',
      },
    })
    const passwordHash = await bcrypt.hash(input.ownerPassword ?? 'Owner@12345', 12)
    await getDb().user.create({
      data: {
        email: input.ownerEmail,
        passwordHash,
        firstName: input.ownerFirstName,
        lastName: input.ownerLastName,
        role: 'OWNER',
        businessId: business.id,
        isActive: true,
        emailVerified: true,
      },
    })
    return business
  }
}
