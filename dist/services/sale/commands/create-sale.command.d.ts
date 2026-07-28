import type { ICommand } from '../../../interfaces/index.js';
type SaleItemInput = {
    productId: string;
    quantity: number;
    unitPrice: number;
    total: number;
};
export type CreateSaleInput = {
    businessId: string;
    userId: string;
    shiftId?: string;
    customerId?: string;
    subtotal: number;
    discount?: number;
    tax?: number;
    total: number;
    paymentMethod?: string;
    notes?: string;
    items: SaleItemInput[];
    ip?: string;
    userAgent?: string;
};
export declare class CreateSaleCommand implements ICommand<CreateSaleInput, Record<string, unknown>> {
    execute(input: CreateSaleInput): Promise<{
        items: {
            id: string;
            saleId: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            total: number;
        }[];
    } & {
        id: string;
        businessId: string;
        userId: string;
        shiftId: string | null;
        customerId: string | null;
        reference: string;
        status: import("@prisma/client").$Enums.SaleStatus;
        subtotal: number;
        discount: number;
        tax: number;
        total: number;
        paymentMethod: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
//# sourceMappingURL=create-sale.command.d.ts.map