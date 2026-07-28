import { cryptoRepository } from '../../../repositories/crypto.repository.js';
export class ConfirmCryptoPaymentCommand {
    async execute(input) {
        await cryptoRepository.updatePayment(input.paymentId, {
            txHash: input.txHash,
            status: 'completed',
            paidAt: new Date(),
        });
        return { message: 'Payment confirmed' };
    }
}
//# sourceMappingURL=confirm-payment.command.js.map