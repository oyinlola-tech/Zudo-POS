import type { ICommand } from '../../../interfaces/index.js';
export type UpdateProductInput = {
    id: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
} & Record<string, unknown>;
export declare class UpdateProductCommand implements ICommand<UpdateProductInput, Record<string, unknown>> {
    execute(input: UpdateProductInput): Promise<{
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
//# sourceMappingURL=update-product.command.d.ts.map