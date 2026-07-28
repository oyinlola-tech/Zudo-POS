import type { ICommand } from '../../../interfaces/service.interface.js';
export type ForgotPasswordInput = {
    email: string;
};
export declare class ForgotPasswordCommand implements ICommand<ForgotPasswordInput, {
    message: string;
}> {
    execute(input: ForgotPasswordInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=forgot-password.command.d.ts.map