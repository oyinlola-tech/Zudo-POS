import { shiftRepository } from '../../../repositories/shift.repository.js'
import type { IQuery } from '../../../interfaces/service.interface.js'

export type GetShiftHistoryInput = { userId: string }

export class GetShiftHistoryQuery implements IQuery<GetShiftHistoryInput, Record<string, unknown>[]> {
  async execute(input: GetShiftHistoryInput) {
    return shiftRepository.findByUser(input.userId)
  }
}