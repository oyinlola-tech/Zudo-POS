export type GenerateQrRequest = {
  currency: string
  amount: number
  saleId?: string
}

export type CryptoWalletRequest = {
  currency: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'SOL'
  address: string
  network?: string
}

export type ConfirmPaymentRequest = {
  paymentId: string
  txHash: string
}

export type GenerateQrResponse = {
  walletAddress: string
  qrDataUrl: string
  paymentId: string
  currency: string
}

export type WalletsResponse = {
  wallets: Array<{ currency: string; address: string; network: string | null }>
}