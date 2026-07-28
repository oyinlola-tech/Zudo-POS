import { saleRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class VoidSaleCommand {
    async execute(input) {
        const { id, userId, ip, userAgent } = input;
        await saleRepository.voidSale(id);
        if (userId) {
            await createAuditLog({ userId, action: 'RETURN', entity: 'Sale', entityId: id, details: 'Sale voided', ip, userAgent });
        }
        return { message: 'Sale voided' };
    }
}
//# sourceMappingURL=void-sale.command.js.map