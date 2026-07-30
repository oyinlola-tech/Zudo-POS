import type { IQuery } from '../../../interfaces/index.js'

export type ListReportsInput = { businessId: string }

export class ListReportsQuery implements IQuery<ListReportsInput, { reports: { type: string; label: string }[] }> {
  async execute(_input: ListReportsInput) {
    return {
      reports: [
        { type: 'daily', label: 'Daily Sales Report' },
        { type: 'weekly', label: 'Weekly Sales Report' },
        { type: 'monthly', label: 'Monthly Sales Report' },
        { type: 'yearly', label: 'Yearly Sales Report' },
        { type: 'inventory', label: 'Inventory Status Report' },
        { type: 'customer', label: 'Customer Activity Report' },
        { type: 'staff', label: 'Staff Performance Report' },
        { type: 'tax', label: 'Tax Summary Report' },
      ],
    }
  }
}
