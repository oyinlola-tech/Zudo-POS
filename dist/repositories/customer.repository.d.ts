export declare const customerRepository: {
    findByBusiness(businessId: string, options?: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            businessId: string;
            firstName: string;
            lastName: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            totalSpent: number;
            visitCount: number;
            lastVisit: Date | null;
            notes: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string, businessId: string): Promise<{
        id: string;
        businessId: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        totalSpent: number;
        visitCount: number;
        lastVisit: Date | null;
        notes: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(businessId: string, email: string): Promise<{
        id: string;
        businessId: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        totalSpent: number;
        visitCount: number;
        lastVisit: Date | null;
        notes: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: {
        businessId: string;
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
        address?: string;
        notes?: string;
    }): Promise<{
        id: string;
        businessId: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        totalSpent: number;
        visitCount: number;
        lastVisit: Date | null;
        notes: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, businessId: string, data: Record<string, unknown>): Promise<{
        id: string;
        businessId: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        totalSpent: number;
        visitCount: number;
        lastVisit: Date | null;
        notes: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        businessId: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        totalSpent: number;
        visitCount: number;
        lastVisit: Date | null;
        notes: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getStats(businessId: string): Promise<{
        total: number;
        newThisMonth: number;
        highValueSegment: number;
        avgSpend: number;
    }>;
};
//# sourceMappingURL=customer.repository.d.ts.map