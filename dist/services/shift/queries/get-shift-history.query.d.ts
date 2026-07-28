import type { IQuery } from '../../../interfaces/service.interface.js';
export type GetShiftHistoryInput = {
    userId: string;
};
export declare class GetShiftHistoryQuery implements IQuery<GetShiftHistoryInput, Record<string, unknown>[]> {
    execute(input: GetShiftHistoryInput): Promise<{
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
}
//# sourceMappingURL=get-shift-history.query.d.ts.map