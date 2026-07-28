export type GeneratePaymentQrInput = { businessId: string; currency: string; amount: number; saleId?: string }
export type GeneratePaymentQrOutput = { walletAddress: string; qrDataUrl: string; paymentId: string; currency: string }
export type ConfirmPaymentInput = { paymentId: string; txHash: string }
export type GetRateInput = { currency: string; amountNgn: number }
export type GetRateOutput = { currency: string; rate: number; cryptoAmount: number }
export type GetWalletsInput = { businessId: string }
export type UpsertWalletInput = { businessId: string; currency: string; address: string; network?: string }