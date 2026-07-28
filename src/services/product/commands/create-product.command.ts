import { productRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type CreateProductInput = {
  businessId: string; name: string; price: number; sku?: string; barcode?: string
  description?: string; costPrice?: number; stock?: number; lowStockQty?: number; category?: string; image?: string
  userId?: string; ip?: string; userAgent?: string
}

export class CreateProductCommand implements ICommand<CreateProductInput, Record<string, unknown>> {
  async execute(input: CreateProductInput) {
    const { userId, ip, userAgent, ...data } = input
    const product = await productRepository.create(data)
    if (userId) {
      await createAuditLog({ userId, action: 'PRODUCT_CREATE', entity: 'Product', entityId: product.id, details: `Created product: ${product.name}`, ip, userAgent })
    }
    return product
  }
}