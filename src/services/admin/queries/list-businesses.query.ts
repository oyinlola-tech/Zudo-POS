import { superadminRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListBusinessesInput = { search?: string; page?: number; limit?: number }

export class ListBusinessesQuery implements IQuery<ListBusinessesInput, Record<string, unknown>> {
  async execute(input: { search?: string; page?: number; limit?: number }) {
    return superadminRepository.listBusinesses(input)
  }
}