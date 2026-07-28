import type { ICommand } from '../../../interfaces/index.js';
export type VoidSaleInput = {
    id: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
};
export declare class VoidSaleCommand implements ICommand<VoidSaleInput, {
    message: string;
}> {
    execute(input: VoidSaleInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=void-sale.command.d.ts.map