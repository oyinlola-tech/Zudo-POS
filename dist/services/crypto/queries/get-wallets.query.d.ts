import type { IQuery } from '../../../interfaces/service.interface.js';
export type GetWalletsInput = {
    businessId: string;
};
export declare class GetWalletsQuery implements IQuery<GetWalletsInput, Array<{
    currency: string;
    address: string;
    network: string | null;
}>> {
    execute(input: GetWalletsInput): Promise<{
        id: string;
        businessId: string;
        currency: string;
        address: string;
        network: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=get-wallets.query.d.ts.map