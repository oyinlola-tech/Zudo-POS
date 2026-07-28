import type { IQuery } from '../../../interfaces/index.js';
export type GetSaleInput = {
    id: string;
};
export declare class GetSaleQuery implements IQuery<GetSaleInput, Record<string, unknown> | null> {
    execute(input: GetSaleInput): Promise<({
        items: ({
            product: {
                id: string;
                businessId: string;
                name: string;
                description: string | null;
                sku: string | null;
                barcode: string | null;
                price: number;
                costPrice: number | null;
                stock: number;
                lowStockQty: number;
                category: string | null;
                image: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            saleId: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            total: number;
        })[];
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
    }) | null>;
}
//# sourceMappingURL=get-sale.query.d.ts.map