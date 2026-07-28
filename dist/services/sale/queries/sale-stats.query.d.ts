import type { IQuery } from '../../../interfaces/index.js';
export type SaleStatsInput = {
    businessId: string;
};
export declare class GetSaleStatsQuery implements IQuery<SaleStatsInput, Record<string, unknown>> {
    execute(input: SaleStatsInput): Promise<{
        totalSales: number;
        totalRevenue: number;
        todaySales: number;
    }>;
}
//# sourceMappingURL=sale-stats.query.d.ts.map