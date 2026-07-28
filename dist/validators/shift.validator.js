import { z } from 'zod';
export const startShiftSchema = z.object({
    pin: z.string().length(4, 'PIN must be 4 digits'),
    startCash: z.number().min(0, 'Starting cash must be positive'),
});
export const endShiftSchema = z.object({
    pin: z.string().length(4, 'PIN must be 4 digits'),
    endCash: z.number().min(0, 'Ending cash must be positive'),
    notes: z.string().optional(),
});
//# sourceMappingURL=shift.validator.js.map