import { superadminRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetBusinessInput = { id: string }

export class GetBusinessQuery implements IQuery<GetBusinessInput, Record<string, unknown> | null> {
  async execute(input: { id: string }) {
    return superadminRepository.getBusiness(input.id)
  }
}