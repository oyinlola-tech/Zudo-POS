import { productRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class UpdateProductCommand {
    async execute(input) {
        const { id, userId, ip, userAgent, ...data } = input;
        const product = await productRepository.update(id, data);
        if (userId) {
            await createAuditLog({ userId, action: 'PRODUCT_UPDATE', entity: 'Product', entityId: id, details: `Updated product: ${product.name}`, ip, userAgent });
        }
        return product;
    }
}
//# sourceMappingURL=update-product.command.js.map