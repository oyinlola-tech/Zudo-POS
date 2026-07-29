export type ReturnData = {
  id: string; reference?: string; total: number; status: string
  reason?: string | null; createdAt: Date; items?: Array<Record<string, unknown>>
}
export type ListReturnsOutput = { items: ReturnData[]; total: number; page: number; limit: number }
export type ProcessReturnInput = { saleId: string; reason?: string }