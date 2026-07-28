import type { ICommand } from '../../../interfaces/service.interface.js';
export type ForgotPinInput = {
    email: string;
    otp: string;
    newPin: string;
};
export declare class ForgotPinCommand implements ICommand<ForgotPinInput, {
    message: string;
}> {
    execute(input: ForgotPinInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=forgot-pin.command.d.ts.map