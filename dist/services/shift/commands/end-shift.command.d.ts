import type { ICommand } from '../../../interfaces/service.interface.js';
export type EndShiftInput = {
    userId: string;
    pin: string;
    endCash: number;
    notes?: string;
};
export declare class EndShiftCommand implements ICommand<EndShiftInput, {
    message: string;
    shiftId: string;
}> {
    execute(input: EndShiftInput): Promise<{
        message: string;
        shiftId: string;
    }>;
}
//# sourceMappingURL=end-shift.command.d.ts.map