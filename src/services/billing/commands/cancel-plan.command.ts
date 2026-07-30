import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CancelPlanInput = { businessId: string }

export class CancelPlanCommand implements ICommand<CancelPlanInput, { message: string }> {
  async execute(input: CancelPlanInput) {
    await getDb().business.update({
      where: { id: input.businessId },
      data: { plan: 'FREE', status: 'TRIAL' },
    })
    return { message: 'Subscription cancelled' }
  }
}
