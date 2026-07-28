import type { IQuery } from '../../../interfaces/index.js';
export type GetCustomerInput = {
    id: string;
    businessId: string;
};
export declare class GetCustomerQuery implements IQuery<GetCustomerInput, Record<string, unknown> | null> {
    execute(input: GetCustomerInput): Promise<{
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
    } | null>;
}
//# sourceMappingURL=get-customer.query.d.ts.map