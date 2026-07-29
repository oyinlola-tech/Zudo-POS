import { billingPlansRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class ListPlansQuery implements IQuery<undefined, Record<string, unknown>> {
  async execute() {
    return billingPlansRepository.listPlans()
  }
}