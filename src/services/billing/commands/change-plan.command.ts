import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type ChangePlanInput = { businessId: string; plan: string }

export class ChangePlanCommand implements ICommand<ChangePlanInput, { message: string }> {
  async execute(input: ChangePlanInput) {
    await getDb().business.update({
      where: { id: input.businessId },
      data: { plan: input.plan as any },
    })
    return { message: `Plan changed to ${input.plan}` }
  }
}