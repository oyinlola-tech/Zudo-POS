import type { ICommand } from '../../../interfaces/service.interface.js';
export type SetupPinInput = {
    userId: string;
    pin: string;
};
export declare class SetupPinCommand implements ICommand<SetupPinInput, {
    message: string;
}> {
    execute(input: SetupPinInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=setup-pin.command.d.ts.map