import { z } from 'zod';
export declare const startShiftSchema: z.ZodObject<{
    pin: z.ZodString;
    startCash: z.ZodNumber;
}, z.core.$strip>;
export declare const endShiftSchema: z.ZodObject<{
    pin: z.ZodString;
    endCash: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=shift.validator.d.ts.map