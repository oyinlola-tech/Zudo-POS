import { returnsRepository } from '../../../repositories/index.js'
import type { IQuery } from '../../../interfaces/index.js'

export type GetReturnInput = { id: string }

export class GetReturnQuery implements IQuery<GetReturnInput, Record<string, unknown> | null> {
  async execute(input: GetReturnInput) {
    return returnsRepository.findById(input.id)
  }
}
