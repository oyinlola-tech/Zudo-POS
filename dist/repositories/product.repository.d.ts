export declare const productRepository: {
    findByBusiness(businessId: string, options?: {
        category?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
    findById(id: string): Promise<{
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
    create(data: {
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
    }): Promise<{
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
    update(id: string, data: Record<string, unknown>): Promise<{
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
    remove(id: string): Promise<{
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
    getInventoryStats(businessId: string): Promise<{
        total: number;
        lowStock: number;
        outOfStock: number;
    }>;
};
//# sourceMappingURL=product.repository.d.ts.map