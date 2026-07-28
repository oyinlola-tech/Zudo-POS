import { cryptoRepository } from '../../../repositories/crypto.repository.js'
import type { IQuery } from '../../../interfaces/service.interface.js'

export type GetWalletsInput = { businessId: string }

export class GetWalletsQuery implements IQuery<GetWalletsInput, Array<{ currency: string; address: string; network: string | null }>> {
  async execute(input: GetWalletsInput) {
    return cryptoRepository.getWallets(input.businessId)
  }
}