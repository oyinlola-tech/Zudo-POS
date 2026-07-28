import type { IQuery } from '../../../interfaces/service.interface.js';
export type GetProfileInput = {
    userId: string;
};
export declare class GetProfileQuery implements IQuery<GetProfileInput, Record<string, unknown> | null> {
    execute(input: GetProfileInput): Promise<Omit<{
        business: {
            id: string;
            name: string;
            slug: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            logo: string | null;
            plan: import("@prisma/client").$Enums.BusinessPlan;
            status: import("@prisma/client").$Enums.BusinessStatus;
            trialEnds: Date | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        email: string;
        passwordHash: string;
        pinHash: string | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        emailVerified: boolean;
        lastLoginAt: Date | null;
        businessId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, "passwordHash" | "pinHash"> | null>;
}
//# sourceMappingURL=profile.query.d.ts.map