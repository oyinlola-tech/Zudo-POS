import { productRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type DeleteProductInput = { id: string; userId?: string; ip?: string; userAgent?: string }

export class DeleteProductCommand implements ICommand<DeleteProductInput, { message: string }> {
  async execute(input: DeleteProductInput) {
    const { id, userId, ip, userAgent } = input
    await productRepository.remove(id)
    if (userId) {
      await createAuditLog({ userId, action: 'PRODUCT_DELETE', entity: 'Product', entityId: id, details: 'Deleted product', ip, userAgent })
    }
    return { message: 'Product deleted' }
  }
}