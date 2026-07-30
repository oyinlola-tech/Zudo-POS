export type CreateExpenseRequest = {
  category: string
  amount: number
  description?: string
  reference?: string
}

export type UpdateExpenseRequest = {
  category?: string
  amount?: number
  description?: string
  reference?: string
}

export type ExpenseResponse = {
  id: string
  businessId: string
  category: string
  amount: number
  description: string | null
  reference: string | null
  createdBy: string
  date: string
  createdAt: string
  updatedAt: string
}

export type ExpenseListResponse = {
  items: ExpenseResponse[]
  total: number
  page: number
  limit: number
}
