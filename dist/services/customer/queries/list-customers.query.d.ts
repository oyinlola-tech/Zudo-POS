import type { IQuery } from '../../../interfaces/index.js';
export type ListCustomersInput = {
    businessId: string;
    search?: string;
    page?: number;
    limit?: number;
};
export declare class ListCustomersQuery implements IQuery<ListCustomersInput, Record<string, unknown>> {
    execute(input: ListCustomersInput): Promise<{
        total: number;
        page: number;
        limit: number;
        items: {
            id: unknown;
            firstName: unknown;
            lastName: unknown;
            name: string;
            email: {} | null;
            phone: {} | null;
            address: {} | null;
            totalSpent: {};
            visitCount: {};
            lastVisit: string | null;
            notes: {} | null;
            isActive: {};
            createdAt: string;
        }[];
    }>;
}
//# sourceMappingURL=list-customers.query.d.ts.map