export type CreateSupplierRequest = {
  name: string
  contactName?: string
  email?: string
  phone?: string
  address?: string
}

export type UpdateSupplierRequest = {
  name?: string
  contactName?: string
  email?: string
  phone?: string
  address?: string
}

export type SupplierResponse = {
  id: string
  businessId: string
  name: string
  contactName: string | null
  email: string | null
  phone: string | null
  address: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type SupplierListResponse = {
  items: SupplierResponse[]
  total: number
  page: number
  limit: number
}
