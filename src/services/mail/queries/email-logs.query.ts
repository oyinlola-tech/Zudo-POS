import type { IQuery } from '../../../interfaces/index.js'

export type EmailLogsInput = { page?: number; limit?: number }

export class EmailLogsQuery implements IQuery<EmailLogsInput, { items: Record<string, unknown>[]; total: number }> {
  async execute(_input: EmailLogsInput) {
    return { items: [], total: 0 }
  }
}
