import type { IQuery } from '../../../interfaces/index.js';
export type ListProductsInput = {
    businessId: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
};
export declare class ListProductsQuery implements IQuery<ListProductsInput, Record<string, unknown>> {
    execute(input: ListProductsInput): Promise<{
        items: {
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
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=list-products.query.d.ts.map