import type { ICommand } from '../../../interfaces/service.interface.js';
export type AdminChangeStaffPinInput = {
    adminId: string;
    staffId: string;
    newPin: string;
};
export declare class AdminChangeStaffPinCommand implements ICommand<AdminChangeStaffPinInput, {
    message: string;
}> {
    execute(input: AdminChangeStaffPinInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=admin-change-staff-pin.command.d.ts.map