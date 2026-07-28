export type CreateCustomerRequest = {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
};
export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;
export type CustomerResponse = {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    totalSpent: number;
    visitCount: number;
    lastVisit: string | null;
    notes: string | null;
    isActive: boolean;
    createdAt: string;
};
export type CustomerListResponse = {
    items: CustomerResponse[];
    total: number;
    page: number;
    limit: number;
};
export type CustomerStatsResponse = {
    total: number;
    newThisMonth: number;
    highValueSegment: number;
    avgSpend: number;
};
//# sourceMappingURL=customer.dto.d.ts.map