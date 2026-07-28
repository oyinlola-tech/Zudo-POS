import { customerRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class UpdateCustomerCommand {
    async execute(input) {
        const { id, businessId, userId, ip, userAgent, ...data } = input;
        const existing = await customerRepository.findById(id, businessId);
        if (!existing)
            throw new Error('Customer not found');
        const customer = await customerRepository.update(id, businessId, data);
        if (userId) {
            await createAuditLog({ userId, action: 'CUSTOMER_UPDATE', entity: 'Customer', entityId: id, details: `Updated customer: ${customer.firstName} ${customer.lastName}`, ip, userAgent });
        }
        return customer;
    }
}
//# sourceMappingURL=update-customer.command.js.map