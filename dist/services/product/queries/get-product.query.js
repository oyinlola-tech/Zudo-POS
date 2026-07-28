import { productRepository } from '../../../repositories/index.js';
export class GetProductQuery {
    async execute(input) {
        return productRepository.findById(input.id);
    }
}
//# sourceMappingURL=get-product.query.js.map