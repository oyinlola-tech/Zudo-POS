import { productRepository } from '../../../repositories/index.js';
export class SearchProductsQuery {
    async execute(input) {
        return productRepository.findByBusiness(input.businessId, { search: input.q });
    }
}
//# sourceMappingURL=search-products.query.js.map