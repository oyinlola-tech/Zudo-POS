import type { ICommand } from '../../../interfaces/service.interface.js';
export type ChangePinInput = {
    userId: string;
    currentPin: string;
    newPin: string;
};
export declare class ChangePinCommand implements ICommand<ChangePinInput, {
    message: string;
}> {
    execute(input: ChangePinInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=change-pin.command.d.ts.map