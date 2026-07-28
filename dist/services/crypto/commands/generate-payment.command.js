import { cryptoRepository } from '../../../repositories/crypto.repository.js';
import { GetRateCommand } from './get-rate.command.js';
export class GeneratePaymentCommand {
    async execute(input) {
        const wallets = await cryptoRepository.getWallets(input.businessId);
        const wallet = wallets.find((w) => w.currency.toUpperCase() === input.currency.toUpperCase());
        if (!wallet)
            throw new Error(`No wallet configured for ${input.currency}`);
        const rateCmd = new GetRateCommand();
        const rate = await rateCmd.execute({
            currency: input.currency,
            amountNgn: input.amountNgn,
        });
        const payment = await cryptoRepository.createPayment({
            businessId: input.businessId,
            saleId: input.saleId,
            currency: input.currency.toUpperCase(),
            amount: rate.amountCrypto,
            amountUsd: input.currency === 'USDT' ? rate.amountCrypto : undefined,
            walletAddress: wallet.address,
        });
        return {
            paymentId: payment.id,
            currency: input.currency.toUpperCase(),
            amountCrypto: rate.amountCrypto,
            walletAddress: wallet.address,
            network: wallet.network,
        };
    }
}
//# sourceMappingURL=generate-payment.command.js.map