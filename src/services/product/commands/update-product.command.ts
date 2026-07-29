import { productRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type UpdateProductInput = { id: string; businessId: string; userId?: string; ip?: string; userAgent?: string } & Record<string, unknown>

export class UpdateProductCommand implements ICommand<UpdateProductInput, Record<string, unknown>> {
  async execute(input: UpdateProductInput) {
    const { id, businessId, userId, ip, userAgent, ...data } = input
    const existing = await productRepository.findById(id)
    if (!existing || existing.businessId !== businessId) throw new Error('Product not found')
    const product = await productRepository.update(id, data)
    if (userId) {
      await createAuditLog({ userId, action: 'PRODUCT_UPDATE', entity: 'Product', entityId: id, details: `Updated product: ${product.name}`, ip, userAgent })
    }
    return product
  }
}