import type { ICommand } from '../../../interfaces/service.interface.js';
export type InvoiceData = {
    businessId: string;
    amount: number;
    description: string;
};
export declare class GenerateInvoiceCommand implements ICommand<InvoiceData, {
    invoiceId: string;
}> {
    execute(input: InvoiceData): Promise<{
        invoiceId: string;
    }>;
}
//# sourceMappingURL=generate-invoice.command.d.ts.map