import type { Prisma } from '@prisma/client';
export declare const userRepository: {
    create(data: Prisma.UserCreateInput): Promise<{
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
    }>;
    findByEmail(email: string): Promise<({
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
    }) | null>;
    findById(id: string): Promise<({
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
    }) | null>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<{
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
    }>;
    updateLastLogin(id: string): Promise<{
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
    }>;
};
//# sourceMappingURL=user.repository.d.ts.map