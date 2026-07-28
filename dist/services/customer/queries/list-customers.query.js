import { customerRepository } from '../../../repositories/index.js';
export class ListCustomersQuery {
    async execute(input) {
        const { businessId, ...options } = input;
        const result = await customerRepository.findByBusiness(businessId, options);
        return {
            ...result,
            items: result.items.map((c) => ({
                id: c['id'],
                firstName: c['firstName'],
                lastName: c['lastName'],
                name: `${c['firstName']} ${c['lastName']}`,
                email: c['email'] ?? null,
                phone: c['phone'] ?? null,
                address: c['address'] ?? null,
                totalSpent: c['totalSpent'] ?? 0,
                visitCount: c['visitCount'] ?? 0,
                lastVisit: c['lastVisit'] ? new Date(c['lastVisit']).toISOString() : null,
                notes: c['notes'] ?? null,
                isActive: c['isActive'] ?? true,
                createdAt: new Date(c['createdAt']).toISOString(),
            })),
        };
    }
}
//# sourceMappingURL=list-customers.query.js.map