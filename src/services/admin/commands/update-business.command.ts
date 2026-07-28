import { superadminRepository } from '../../../repositories/index.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateBusinessInput = {
  id: string; name?: string; email?: string; phone?: string; address?: string
  plan?: string; status?: string
}

export class UpdateBusinessCommand implements ICommand<UpdateBusinessInput, Record<string, unknown>> {
  async execute(input: UpdateBusinessInput) {
    const { id, ...data } = input
    return superadminRepository.updateBusiness(id, data)
  }
}