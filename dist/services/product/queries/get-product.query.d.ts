import type { IQuery } from '../../../interfaces/index.js';
export type GetProductInput = {
    id: string;
};
export declare class GetProductQuery implements IQuery<GetProductInput, Record<string, unknown> | null> {
    execute(input: GetProductInput): Promise<{
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
    } | null>;
}
//# sourceMappingURL=get-product.query.d.ts.map