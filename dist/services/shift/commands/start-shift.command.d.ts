import type { ICommand } from '../../../interfaces/service.interface.js';
export type StartShiftInput = {
    userId: string;
    pin: string;
    startCash: number;
    businessId: string;
};
export declare class StartShiftCommand implements ICommand<StartShiftInput, {
    message: string;
    shiftId: string;
}> {
    execute(input: StartShiftInput): Promise<{
        message: string;
        shiftId: string;
    }>;
}
//# sourceMappingURL=start-shift.command.d.ts.map