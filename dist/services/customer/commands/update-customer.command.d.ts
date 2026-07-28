import type { ICommand } from '../../../interfaces/index.js';
export type UpdateCustomerInput = {
    id: string;
    businessId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
};
export declare class UpdateCustomerCommand implements ICommand<UpdateCustomerInput, Record<string, unknown>> {
    execute(input: UpdateCustomerInput): Promise<{
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
        points: number;
        loyaltyTier: string;
        notes: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=update-customer.command.d.ts.map