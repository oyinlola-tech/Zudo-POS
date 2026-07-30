import { rolesRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetRoleInput = { role: string }

export class GetRoleQuery implements IQuery<GetRoleInput, Record<string, unknown> | null> {
  async execute(input: GetRoleInput) {
    return rolesRepository.getRole(input.role)
  }
}
