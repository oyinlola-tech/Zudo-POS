import { productRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class DeleteProductCommand {
    async execute(input) {
        const { id, userId, ip, userAgent } = input;
        await productRepository.remove(id);
        if (userId) {
            await createAuditLog({ userId, action: 'PRODUCT_DELETE', entity: 'Product', entityId: id, details: 'Deleted product', ip, userAgent });
        }
        return { message: 'Product deleted' };
    }
}
//# sourceMappingURL=delete-product.command.js.map