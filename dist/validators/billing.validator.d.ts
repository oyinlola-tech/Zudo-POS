import { z } from 'zod';
export declare const billingPlanSchema: z.ZodObject<{
    plan: z.ZodEnum<{
        ENTERPRISE: "ENTERPRISE";
        FREE: "FREE";
        PROFESSIONAL: "PROFESSIONAL";
        STARTER: "STARTER";
    }>;
}, z.core.$strip>;
export declare const invoiceSchema: z.ZodObject<{
    businessId: z.ZodString;
    amount: z.ZodNumber;
    description: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=billing.validator.d.ts.map