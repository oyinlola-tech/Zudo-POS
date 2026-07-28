import type { ICommand } from '../../../interfaces/service.interface.js';
export type SendOtpInput = {
    userId: string;
    email: string;
    type: string;
};
export declare class SendOtpCommand implements ICommand<SendOtpInput, {
    message: string;
}> {
    execute(input: SendOtpInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=send-otp.command.d.ts.map