import { cryptoRepository } from '../../../repositories/crypto.repository.js'
import type { IQuery } from '../../../interfaces/service.interface.js'

export type UpsertWalletInput = { businessId: string; currency: string; address: string; network?: string }

export class UpsertWalletQuery implements IQuery<UpsertWalletInput, { message: string }> {
  async execute(input: UpsertWalletInput) {
    await cryptoRepository.upsertWallet(input)
    return { message: `${input.currency} wallet updated` }
  }
}