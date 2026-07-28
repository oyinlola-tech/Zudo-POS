import { saleRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class CreateSaleCommand {
    async execute(input) {
        const { ip, userAgent, ...data } = input;
        const sale = await saleRepository.create(data);
        await createAuditLog({
            userId: data.userId,
            action: 'SALE',
            entity: 'Sale',
            entityId: sale.id,
            details: `Sale ${sale.reference} — ₦${data.total.toLocaleString()}`,
            ip,
            userAgent,
        });
        return sale;
    }
}
//# sourceMappingURL=create-sale.command.js.map