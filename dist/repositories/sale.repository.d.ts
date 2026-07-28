export declare const saleRepository: {
    create(data: {
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
        items: Array<{
            productId: string;
            quantity: number;
            unitPrice: number;
            total: number;
        }>;
    }): Promise<{
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
    findByBusiness(businessId: string, options?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<{
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
    findById(id: string): Promise<({
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
    voidSale(id: string): Promise<{
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
    getStats(businessId: string): Promise<{
        totalSales: number;
        totalRevenue: number;
        todaySales: number;
    }>;
};
//# sourceMappingURL=sale.repository.d.ts.map