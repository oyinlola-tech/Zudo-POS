import type { ICommand } from '../../../interfaces/service.interface.js';
export type GeneratePaymentInput = {
    businessId: string;
    currency: string;
    amountNgn: number;
    saleId?: string;
};
export type GeneratePaymentOutput = {
    paymentId: string;
    currency: string;
    amountCrypto: number;
    walletAddress: string;
    network: string | null;
};
export declare class GeneratePaymentCommand implements ICommand<GeneratePaymentInput, GeneratePaymentOutput> {
    execute(input: GeneratePaymentInput): Promise<{
        paymentId: string;
        currency: string;
        amountCrypto: any;
        walletAddress: string;
        network: string | null;
    }>;
}
//# sourceMappingURL=generate-payment.command.d.ts.map