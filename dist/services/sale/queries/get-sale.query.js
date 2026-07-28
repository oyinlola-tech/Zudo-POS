import { saleRepository } from '../../../repositories/index.js';
export class GetSaleQuery {
    async execute(input) {
        return saleRepository.findById(input.id);
    }
}
//# sourceMappingURL=get-sale.query.js.map