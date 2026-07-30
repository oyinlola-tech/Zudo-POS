import type { ICommand } from '../../../interfaces/index.js'

export type ScheduleReportInput = { businessId: string; type: string; email: string; frequency: string }

export class ScheduleReportCommand implements ICommand<ScheduleReportInput, { message: string }> {
  async execute(input: ScheduleReportInput) {
    return { message: `Report "${input.type}" scheduled ${input.frequency} for ${input.email}` }
  }
}
