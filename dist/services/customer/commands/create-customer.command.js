import { customerRepository } from '../../../repositories/index.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class CreateCustomerCommand {
    async execute(input) {
        const { userId, ip, userAgent, ...data } = input;
        if (data.email) {
            const existing = await customerRepository.findByEmail(data.businessId, data.email);
            if (existing)
                throw new Error('Customer with this email already exists');
        }
        const customer = await customerRepository.create(data);
        if (userId) {
            await createAuditLog({ userId, action: 'CUSTOMER_CREATE', entity: 'Customer', entityId: customer.id, details: `Created customer: ${customer.firstName} ${customer.lastName}`, ip, userAgent });
        }
        return customer;
    }
}
//# sourceMappingURL=create-customer.command.js.map