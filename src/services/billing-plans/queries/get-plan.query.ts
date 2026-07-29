import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class GetPlanQuery implements IQuery<{ planId: string }, Record<string, unknown>> {
  async execute(input: { planId: string }) {
    return billingPlansRepository.getPlan(input.planId)
  }
}