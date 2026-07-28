import type { ICommand } from '../../../interfaces/service.interface.js';
export type GetRateInput = {
    currency: string;
    amountNgn: number;
};
export type GetRateOutput = {
    currency: string;
    rate: number;
    cryptoAmount: number;
};
export declare class GetCryptoRateCommand implements ICommand<GetRateInput, GetRateOutput> {
    execute(input: GetRateInput): Promise<{
        currency: string;
        rate: number;
        cryptoAmount: number;
    }>;
}
//# sourceMappingURL=get-rate.command.d.ts.map