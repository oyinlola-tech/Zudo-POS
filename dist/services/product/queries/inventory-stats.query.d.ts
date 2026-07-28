import type { IQuery } from '../../../interfaces/index.js';
export type InventoryStatsInput = {
    businessId: string;
};
export declare class GetInventoryStatsQuery implements IQuery<InventoryStatsInput, Record<string, unknown>> {
    execute(input: InventoryStatsInput): Promise<{
        total: number;
        lowStock: number;
        outOfStock: number;
    }>;
}
//# sourceMappingURL=inventory-stats.query.d.ts.map