import type { ICommand } from '../../../interfaces/service.interface.js';
export type GeneratePaymentQrInput = {
    businessId: string;
    currency: string;
    amount: number;
    saleId?: string;
};
export type GeneratePaymentQrOutput = {
    walletAddress: string;
    qrDataUrl: string;
    paymentId: string;
    currency: string;
};
export declare class GeneratePaymentQrCommand implements ICommand<GeneratePaymentQrInput, GeneratePaymentQrOutput> {
    execute(input: GeneratePaymentQrInput): Promise<{
        walletAddress: string;
        qrDataUrl: string;
        paymentId: string;
        currency: string;
    }>;
}
//# sourceMappingURL=generate-qr.command.d.ts.map