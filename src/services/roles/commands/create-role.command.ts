import { rolesRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateRoleInput = { name: string; permissions?: Record<string, boolean> }

export class CreateRoleCommand implements ICommand<CreateRoleInput, Record<string, unknown>> {
  async execute(input: CreateRoleInput) {
    return rolesRepository.createRole(input)
  }
}