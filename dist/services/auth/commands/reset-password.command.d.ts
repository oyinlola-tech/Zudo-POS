import type { ICommand } from '../../../interfaces/service.interface.js';
export type ResetPasswordInput = {
    email: string;
    otp: string;
    newPassword: string;
};
export declare class ResetPasswordCommand implements ICommand<ResetPasswordInput, {
    message: string;
}> {
    execute(input: ResetPasswordInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=reset-password.command.d.ts.map