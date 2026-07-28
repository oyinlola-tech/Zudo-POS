import { productRepository } from '../../../repositories/index.js';
export class ListProductsQuery {
    async execute(input) {
        return productRepository.findByBusiness(input.businessId, input);
    }
}
//# sourceMappingURL=list-products.query.js.map