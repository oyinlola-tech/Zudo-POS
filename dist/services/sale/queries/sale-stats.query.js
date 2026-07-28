import { saleRepository } from '../../../repositories/index.js';
export class GetSaleStatsQuery {
    async execute(input) {
        return saleRepository.getStats(input.businessId);
    }
}
//# sourceMappingURL=sale-stats.query.js.map