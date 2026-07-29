import { billingPlansRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export class CreatePlanCommand implements ICommand<Record<string, unknown>, Record<string, unknown>> {
  async execute(input: Record<string, unknown>) {
    return billingPlansRepository.createPlan(input as never)
  }
}

export class UpdatePlanCommand implements ICommand<{ planId: string; data: Record<string, unknown> }, Record<string, unknown>> {
  async execute(input: { planId: string; data: Record<string, unknown> }) {
    return billingPlansRepository.updatePlan(input.planId, input.data)
  }
}