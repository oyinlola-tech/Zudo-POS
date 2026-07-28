export type StartShiftRequest = {
    pin: string;
    startCash: number;
};
export type EndShiftRequest = {
    pin: string;
    endCash: number;
    notes?: string;
};
export type ShiftResponse = {
    id: string;
    userId: string;
    startCash: number;
    endCash: number | null;
    status: string;
    startedAt: Date;
    endedAt: Date | null;
};
export type ActiveShiftResponse = {
    shift: ShiftResponse | null;
};
export type ShiftHistoryResponse = {
    history: ShiftResponse[];
};
//# sourceMappingURL=shift.dto.d.ts.map