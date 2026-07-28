import { settingsRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateSettingsInput = {
  businessId: string; settings: Record<string, string>
  userId?: string; ip?: string; userAgent?: string
}

export class UpdateSettingsCommand implements ICommand<UpdateSettingsInput, Record<string, unknown>> {
  async execute(input: UpdateSettingsInput) {
    const { businessId, settings, userId, ip, userAgent } = input
    await settingsRepository.upsertMany(businessId, settings)
    if (userId) {
      await createAuditLog({ userId, action: 'SETTINGS_CHANGE', entity: 'Settings', details: 'Updated business settings', ip, userAgent })
    }
    return settingsRepository.getAll(businessId)
  }
}