import { getDb } from '../../../databases/index.js'
import type { IQuery } from '../../../interfaces/service.interface.js'

export type GetPlanInput = { businessId: string }

export class GetPlanQuery implements IQuery<GetPlanInput, { plan: string; status: string } | null> {
  async execute(input: GetPlanInput) {
    return getDb().business.findUnique({
      where: { id: input.businessId },
      select: { plan: true, status: true },
    })
  }
}