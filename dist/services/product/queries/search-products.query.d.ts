import type { IQuery } from '../../../interfaces/index.js';
export type SearchProductsInput = {
    businessId: string;
    q: string;
};
export declare class SearchProductsQuery implements IQuery<SearchProductsInput, Record<string, unknown>> {
    execute(input: SearchProductsInput): Promise<{
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
//# sourceMappingURL=search-products.query.d.ts.map