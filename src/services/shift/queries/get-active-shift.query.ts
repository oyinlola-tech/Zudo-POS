import { shiftRepository } from '../../../repositories/shift.repository.js'
import type { IQuery } from '../../../interfaces/service.interface.js'

export type GetActiveShiftInput = { userId: string }

export class GetActiveShiftQuery implements IQuery<GetActiveShiftInput, Record<string, unknown> | null> {
  async execute(input: GetActiveShiftInput) {
    return shiftRepository.findActiveByUser(input.userId)
  }
}