import type { ICommand } from '../../../interfaces/index.js';
export type DeleteProductInput = {
    id: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
};
export declare class DeleteProductCommand implements ICommand<DeleteProductInput, {
    message: string;
}> {
    execute(input: DeleteProductInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=delete-product.command.d.ts.map