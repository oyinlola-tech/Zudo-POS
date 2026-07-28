import type { IQuery } from '../../../interfaces/index.js';
export type ListSalesInput = {
    businessId: string;
    page?: number;
    limit?: number;
    status?: string;
};
export declare class ListSalesQuery implements IQuery<ListSalesInput, Record<string, unknown>> {
    execute(input: ListSalesInput): Promise<{
        items: ({
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=list-sales.query.d.ts.map