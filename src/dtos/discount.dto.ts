export type CreateDiscountRequest = {
  name: string
  type: string
  value: number
  minPurchase?: number
  startsAt?: Date
  endsAt?: Date
}

export type UpdateDiscountRequest = {
  name?: string
  type?: string
  value?: number
  minPurchase?: number
  isActive?: boolean
  startsAt?: Date
  endsAt?: Date
}

export type DiscountResponse = {
  id: string
  businessId: string
  name: string
  type: string
  value: number
  minPurchase: number | null
  isActive: boolean
  startsAt: string | null
  endsAt: string | null
  createdAt: string
  updatedAt: string
}

export type DiscountListResponse = {
  items: DiscountResponse[]
}
