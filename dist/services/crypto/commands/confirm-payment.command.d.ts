import type { ICommand } from '../../../interfaces/service.interface.js';
export type ConfirmPaymentInput = {
    paymentId: string;
    txHash: string;
};
export declare class ConfirmCryptoPaymentCommand implements ICommand<ConfirmPaymentInput, {
    message: string;
}> {
    execute(input: ConfirmPaymentInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=confirm-payment.command.d.ts.map