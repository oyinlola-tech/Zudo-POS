import type { IQuery } from '../../../interfaces/index.js';
export type CustomerStatsInput = {
    businessId: string;
};
export declare class CustomerStatsQuery implements IQuery<CustomerStatsInput, Record<string, unknown>> {
    execute(input: CustomerStatsInput): Promise<{
        total: number;
        newThisMonth: number;
        highValueSegment: number;
        avgSpend: number;
    }>;
}
//# sourceMappingURL=customer-stats.query.d.ts.map