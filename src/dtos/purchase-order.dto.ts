export type PurchaseOrderItemInput = {
  productId: string
  quantity: number
  unitCost: number
  total: number
}

export type CreatePurchaseOrderRequest = {
  reference: string
  supplierId?: string
  items: PurchaseOrderItemInput[]
}

export type UpdatePurchaseOrderRequest = {
  reference?: string
  supplierId?: string
  status?: string
}

export type PurchaseOrderItemResponse = {
  id: string
  productId: string
  quantity: number
  unitCost: number
  total: number
}

export type PurchaseOrderResponse = {
  id: string
  businessId: string
  reference: string
  supplierId: string | null
  supplier: { name: string } | null
  status: string
  total: number
  createdBy: string
  receivedAt: string | null
  items: PurchaseOrderItemResponse[]
  createdAt: string
  updatedAt: string
}

export type PurchaseOrderListResponse = {
  items: PurchaseOrderResponse[]
  total: number
  page: number
  limit: number
}
