import type { ICommand } from '../../../interfaces/service.interface.js';
export type ChangePasswordInput = {
    userId: string;
    currentPassword: string;
    newPassword: string;
};
export declare class ChangePasswordCommand implements ICommand<ChangePasswordInput, {
    message: string;
}> {
    execute(input: ChangePasswordInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=change-password.command.d.ts.map