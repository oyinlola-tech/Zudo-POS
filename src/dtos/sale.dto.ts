export type CreateSaleRequest = {
  subtotal: number; total: number; discount?: number; tax?: number
  paymentMethod?: string; notes?: string; shiftId?: string
  items: Array<{ productId: string; quantity: number; unitPrice: number; total: number }>
}

export type SaleResponse = {
  id: string; reference: string; subtotal: number; discount: number; tax: number; total: number
  status: string; paymentMethod: string | null; createdAt: string
  items: Array<{ productId: string; quantity: number; unitPrice: number; total: number }>
}

export type SaleListResponse = {
  items: SaleResponse[]; total: number; page: number; limit: number
}

export type SaleStatsResponse = {
  totalSales: number; totalRevenue: number; todaySales: number
}