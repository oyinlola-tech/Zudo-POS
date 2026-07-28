import { settingsRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetBranchesInput = { businessId: string }

export class GetBranchesQuery implements IQuery<GetBranchesInput, Record<string, unknown>> {
  async execute(input: GetBranchesInput) {
    const items = await settingsRepository.getBranches(input.businessId)
    return { items }
  }
}