export type CreateProductRequest = {
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
};
export type UpdateProductRequest = Partial<CreateProductRequest>;
export type ProductResponse = {
    id: string;
    name: string;
    price: number;
    sku: string | null;
    stock: number;
    category: string | null;
    description: string | null;
    costPrice: number | null;
    isActive: boolean;
};
export type ProductListResponse = {
    items: ProductResponse[];
    total: number;
    page: number;
    limit: number;
};
export type InventoryStatsResponse = {
    total: number;
    lowStock: number;
    outOfStock: number;
};
//# sourceMappingURL=product.dto.d.ts.map