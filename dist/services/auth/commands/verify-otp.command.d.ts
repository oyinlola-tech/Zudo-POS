import type { ICommand } from '../../../interfaces/service.interface.js';
export type VerifyOtpInput = {
    userId: string;
    code: string;
    type: string;
};
export declare class VerifyOtpCommand implements ICommand<VerifyOtpInput, {
    valid: boolean;
}> {
    execute(input: VerifyOtpInput): Promise<{
        valid: boolean;
    }>;
}
//# sourceMappingURL=verify-otp.command.d.ts.map