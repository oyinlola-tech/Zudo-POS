import type { ICommand } from '../../../interfaces/index.js';
export type CreateProductInput = {
    businessId: string;
    name: string;
    price: number;
    sku?: string;
    barcode?: string;
    description?: string;
    costPrice?: number;
    stock?: number;
    lowStockQty?: number;
    category?: string;
    image?: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
};
export declare class CreateProductCommand implements ICommand<CreateProductInput, Record<string, unknown>> {
    execute(input: CreateProductInput): Promise<{
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
    }>;
}
//# sourceMappingURL=create-product.command.d.ts.map