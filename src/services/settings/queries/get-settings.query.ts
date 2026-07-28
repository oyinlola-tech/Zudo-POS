import { settingsRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetSettingsInput = { businessId: string }

export class GetSettingsQuery implements IQuery<GetSettingsInput, Record<string, string>> {
  async execute(input: GetSettingsInput) {
    return settingsRepository.getAll(input.businessId)
  }
}