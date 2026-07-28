import type { ICommand } from '../../../interfaces/service.interface.js';
import type { RegisterCommandInput, RegisterCommandOutput } from '../../../types/index.js';
export declare class RegisterCommand implements ICommand<RegisterCommandInput, RegisterCommandOutput> {
    execute(input: RegisterCommandInput): Promise<{
        token: string;
        user: Omit<{
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
        }, "passwordHash" | "pinHash">;
    }>;
}
//# sourceMappingURL=register.command.d.ts.map