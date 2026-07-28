import { customerRepository } from '../../../repositories/index.js';
export class CustomerStatsQuery {
    async execute(input) {
        return customerRepository.getStats(input.businessId);
    }
}
//# sourceMappingURL=customer-stats.query.js.map