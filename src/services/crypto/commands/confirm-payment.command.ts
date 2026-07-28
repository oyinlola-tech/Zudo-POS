import { cryptoRepository } from '../../../repositories/crypto.repository.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type ConfirmPaymentInput = {
  paymentId: string
  txHash: string
}

export class ConfirmCryptoPaymentCommand
  implements ICommand<ConfirmPaymentInput, { message: string }>
{
  async execute(input: ConfirmPaymentInput) {
    await cryptoRepository.updatePayment(input.paymentId, {
      txHash: input.txHash,
      status: 'completed',
      paidAt: new Date(),
    })
    return { message: 'Payment confirmed' }
  }
}