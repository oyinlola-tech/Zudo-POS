import type { IQuery } from '../../../interfaces/service.interface.js';
export type GetActiveShiftInput = {
    userId: string;
};
export declare class GetActiveShiftQuery implements IQuery<GetActiveShiftInput, Record<string, unknown> | null> {
    execute(input: GetActiveShiftInput): Promise<{
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
}
//# sourceMappingURL=get-active-shift.query.d.ts.map