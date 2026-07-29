import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteBusinessInput = { id: string }

export class DeleteBusinessCommand implements ICommand<DeleteBusinessInput, { message: string }> {
  async execute(input: DeleteBusinessInput) {
    const business = await getDb().business.findUnique({ where: { id: input.id } })
    if (!business) throw new Error('Business not found')
    await getDb().business.update({ where: { id: input.id }, data: { status: 'SUSPENDED' } })
    return { message: 'Business suspended' }
  }
}
