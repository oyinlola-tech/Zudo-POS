export declare const shiftRepository: {
    create(data: {
        userId: string;
        businessId: string;
        startCash: number;
    }): Promise<{
        id: string;
        userId: string;
        businessId: string;
        startedAt: Date;
        endedAt: Date | null;
        startCash: number;
        endCash: number | null;
        expectedCash: number | null;
        cashDiff: number | null;
        status: import("@prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findActiveByUser(userId: string): Promise<{
        id: string;
        userId: string;
        businessId: string;
        startedAt: Date;
        endedAt: Date | null;
        startCash: number;
        endCash: number | null;
        expectedCash: number | null;
        cashDiff: number | null;
        status: import("@prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        userId: string;
        businessId: string;
        startedAt: Date;
        endedAt: Date | null;
        startCash: number;
        endCash: number | null;
        expectedCash: number | null;
        cashDiff: number | null;
        status: import("@prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    close(id: string, endCash: number, notes?: string): Promise<{
        id: string;
        userId: string;
        businessId: string;
        startedAt: Date;
        endedAt: Date | null;
        startCash: number;
        endCash: number | null;
        expectedCash: number | null;
        cashDiff: number | null;
        status: import("@prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByUser(userId: string): Promise<{
        id: string;
        userId: string;
        businessId: string;
        startedAt: Date;
        endedAt: Date | null;
        startCash: number;
        endCash: number | null;
        expectedCash: number | null;
        cashDiff: number | null;
        status: import("@prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByBusiness(businessId: string): Promise<({
        user: {
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
        };
    } & {
        id: string;
        userId: string;
        businessId: string;
        startedAt: Date;
        endedAt: Date | null;
        startCash: number;
        endCash: number | null;
        expectedCash: number | null;
        cashDiff: number | null;
        status: import("@prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
};
//# sourceMappingURL=shift.repository.d.ts.map