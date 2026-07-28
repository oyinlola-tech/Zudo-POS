import { getDb } from '../../../databases/index.js';
export class GetPlanQuery {
    async execute(input) {
        return getDb().business.findUnique({
            where: { id: input.businessId },
            select: { plan: true, status: true },
        });
    }
}
//# sourceMappingURL=get-plan.query.js.map