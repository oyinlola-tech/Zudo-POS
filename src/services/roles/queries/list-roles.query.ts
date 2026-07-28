import { rolesRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export class ListRolesQuery implements IQuery<undefined, Record<string, unknown>> {
  async execute(_input: undefined) {
    return rolesRepository.listRoles()
  }
}