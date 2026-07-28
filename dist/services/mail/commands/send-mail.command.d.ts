import type { ICommand } from '../../../interfaces/service.interface.js';
export type SendOtpMailInput = {
    to: string;
    code: string;
    type: string;
};
export declare class SendOtpMailCommand implements ICommand<SendOtpMailInput, void> {
    execute(input: SendOtpMailInput): Promise<void>;
}
//# sourceMappingURL=send-mail.command.d.ts.map