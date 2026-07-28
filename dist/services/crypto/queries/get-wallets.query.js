import { cryptoRepository } from '../../../repositories/crypto.repository.js';
export class GetWalletsQuery {
    async execute(input) {
        return cryptoRepository.getWallets(input.businessId);
    }
}
//# sourceMappingURL=get-wallets.query.js.map