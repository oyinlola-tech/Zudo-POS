import type { IQuery } from '../../../interfaces/service.interface.js';
export type GetPlanInput = {
    businessId: string;
};
export declare class GetPlanQuery implements IQuery<GetPlanInput, {
    plan: string;
    status: string;
} | null> {
    execute(input: GetPlanInput): Promise<{
        plan: import("@prisma/client").$Enums.BusinessPlan;
        status: import("@prisma/client").$Enums.BusinessStatus;
    } | null>;
}
//# sourceMappingURL=get-plan.query.d.ts.map