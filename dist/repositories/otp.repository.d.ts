export declare const otpRepository: {
    create(data: {
        userId: string;
        code: string;
        type: string;
        expiresAt: Date;
    }): Promise<{
        id: string;
        userId: string;
        code: string;
        type: string;
        expiresAt: Date;
        used: boolean;
        createdAt: Date;
    }>;
    findValid(userId: string, code: string, type: string): Promise<{
        id: string;
        userId: string;
        code: string;
        type: string;
        expiresAt: Date;
        used: boolean;
        createdAt: Date;
    } | null>;
    markUsed(id: string): Promise<{
        id: string;
        userId: string;
        code: string;
        type: string;
        expiresAt: Date;
        used: boolean;
        createdAt: Date;
    }>;
    invalidateUserOtps(userId: string, type: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
};
//# sourceMappingURL=otp.repository.d.ts.map