import { productRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class CreateProductCommand {
    async execute(input) {
        const { userId, ip, userAgent, ...data } = input;
        const product = await productRepository.create(data);
        if (userId) {
            await createAuditLog({ userId, action: 'PRODUCT_CREATE', entity: 'Product', entityId: product.id, details: `Created product: ${product.name}`, ip, userAgent });
        }
        return product;
    }
}
//# sourceMappingURL=create-product.command.js.map