import { superadminRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type ListBusinessesInput = { search?: string; page?: number; limit?: number }

export class ListBusinessesQuery implements IQuery<ListBusinessesInput, Record<string, unknown>> {
  async execute(input: ListBusinessesInput) {
    return superadminRepository.listBusinesses(input)
  }
}

export type GetBusinessInput = { id: string }

export class GetBusinessQuery implements IQuery<GetBusinessInput, Record<string, unknown> | null> {
  async execute(input: GetBusinessInput) {
    return superadminRepository.getBusiness(input.id)
  }
}

export class GetRevenueStatsQuery implements IQuery<Record<string, never>, Record<string, unknown>> {
  async execute() {
    return superadminRepository.getRevenueStats()
  }
}