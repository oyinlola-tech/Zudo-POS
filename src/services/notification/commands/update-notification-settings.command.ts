import { getDb } from '../../../databases/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateNotificationSettingsInput = {
  businessId: string
  settings: Record<string, string>
}

export class UpdateNotificationSettingsCommand implements ICommand<UpdateNotificationSettingsInput, { message: string }> {
  async execute(input: UpdateNotificationSettingsInput) {
    for (const [key, value] of Object.entries(input.settings)) {
      await getDb().businessSetting.upsert({
        where: { businessId_key: { businessId: input.businessId, key: `notif_settings_${key}` } },
        update: { value },
        create: { businessId: input.businessId, key: `notif_settings_${key}`, value },
      })
    }
    return { message: 'Notification settings updated' }
  }
}
