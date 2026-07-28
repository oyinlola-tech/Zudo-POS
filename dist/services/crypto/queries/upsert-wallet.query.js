import { cryptoRepository } from '../../../repositories/crypto.repository.js';
export class UpsertWalletQuery {
    async execute(input) {
        await cryptoRepository.upsertWallet(input);
        return { message: `${input.currency} wallet updated` };
    }
}
//# sourceMappingURL=upsert-wallet.query.js.map