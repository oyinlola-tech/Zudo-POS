import type { IQuery } from '../../../interfaces/service.interface.js';
export type MailStatusInput = {
    messageId: string;
};
export declare class MailStatusQuery implements IQuery<MailStatusInput, {
    sent: boolean;
}> {
    execute(_input: MailStatusInput): Promise<{
        sent: boolean;
    }>;
}
//# sourceMappingURL=mail-status.query.d.ts.map