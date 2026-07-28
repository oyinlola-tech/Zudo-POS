import QRCode from 'qrcode';
import { cryptoRepository } from '../../../repositories/crypto.repository.js';
export class GeneratePaymentQrCommand {
    async execute(input) {
        const wallets = await cryptoRepository.getWallets(input.businessId);
        const wallet = wallets.find((w) => w.currency === input.currency);
        if (!wallet)
            throw new Error(`No ${input.currency} wallet configured`);
        const payment = await cryptoRepository.createPayment({
            businessId: input.businessId,
            saleId: input.saleId,
            currency: input.currency,
            amount: input.amount,
            walletAddress: wallet.address,
        });
        const qrDataUrl = await QRCode.toDataURL(`${input.currency}:${wallet.address}?amount=${input.amount}`, { width: 300, margin: 2, color: { dark: '#000b01', light: '#ffffff' } });
        return { walletAddress: wallet.address, qrDataUrl, paymentId: payment.id, currency: input.currency };
    }
}
//# sourceMappingURL=generate-qr.command.js.map