import type { ICommand } from '../../../interfaces/service.interface.js'

const CRYPTO_RATES: Record<string, number> = {
  BTC: 98000000,
  ETH: 5200000,
  USDT: 1550,
  USDC: 1550,
  BNB: 420000,
  SOL: 95000,
}

export type GetRateInput = {
  currency: string
  amountNgn: number
}

export type GetRateOutput = {
  currency: string
  rate: number
  cryptoAmount: number
}

export class GetCryptoRateCommand
  implements ICommand<GetRateInput, GetRateOutput>
{
  async execute(input: GetRateInput) {
    const rate = CRYPTO_RATES[input.currency]
    if (!rate) throw new Error(`Unsupported currency: ${input.currency}`)

    return {
      currency: input.currency,
      rate,
      cryptoAmount: parseFloat((input.amountNgn / rate).toFixed(8)),
    }
  }
}