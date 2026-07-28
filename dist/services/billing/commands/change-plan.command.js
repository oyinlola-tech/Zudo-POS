import { getDb } from '../../../databases/index.js';
export class ChangePlanCommand {
    async execute(input) {
        await getDb().business.update({
            where: { id: input.businessId },
            data: { plan: input.plan },
        });
        return { message: `Plan changed to ${input.plan}` };
    }
}
//# sourceMappingURL=change-plan.command.js.map