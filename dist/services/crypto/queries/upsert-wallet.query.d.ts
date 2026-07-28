import type { IQuery } from '../../../interfaces/service.interface.js';
export type UpsertWalletInput = {
    businessId: string;
    currency: string;
    address: string;
    network?: string;
};
export declare class UpsertWalletQuery implements IQuery<UpsertWalletInput, {
    message: string;
}> {
    execute(input: UpsertWalletInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=upsert-wallet.query.d.ts.map