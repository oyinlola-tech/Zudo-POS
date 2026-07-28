import { productRepository } from '../../../repositories/index.js';
export class GetInventoryStatsQuery {
    async execute(input) {
        return productRepository.getInventoryStats(input.businessId);
    }
}
//# sourceMappingURL=inventory-stats.query.js.map