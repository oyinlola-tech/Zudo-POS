export type CreateTaxRequest = {
  name: string
  rate: number
  type?: string
}

export type UpdateTaxRequest = {
  name?: string
  rate?: number
  type?: string
  isActive?: boolean
}

export type TaxResponse = {
  id: string
  businessId: string
  name: string
  rate: number
  type: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type TaxListResponse = {
  items: TaxResponse[]
}
