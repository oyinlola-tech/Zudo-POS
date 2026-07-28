import { getDb } from '../../../databases/index.js';
export class GenerateInvoiceCommand {
    async execute(input) {
        const invoice = await getDb().businessSetting.create({
            data: {
                businessId: input.businessId,
                key: `invoice_${Date.now()}`,
                value: JSON.stringify({
                    amount: input.amount,
                    description: input.description,
                    date: new Date().toISOString(),
                }),
            },
        });
        return { invoiceId: invoice.id };
    }
}
//# sourceMappingURL=generate-invoice.command.js.map