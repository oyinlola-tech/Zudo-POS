import { saleRepository } from '../../../repositories/index.js';
export class ListSalesQuery {
    async execute(input) {
        return saleRepository.findByBusiness(input.businessId, input);
    }
}
//# sourceMappingURL=list-sales.query.js.map