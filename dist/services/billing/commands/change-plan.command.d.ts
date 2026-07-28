import type { ICommand } from '../../../interfaces/service.interface.js';
export type ChangePlanInput = {
    businessId: string;
    plan: string;
};
export declare class ChangePlanCommand implements ICommand<ChangePlanInput, {
    message: string;
}> {
    execute(input: ChangePlanInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=change-plan.command.d.ts.map