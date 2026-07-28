import { z } from 'zod';
export declare const cryptoWalletSchema: z.ZodObject<{
    currency: z.ZodEnum<{
        BNB: "BNB";
        BTC: "BTC";
        ETH: "ETH";
        SOL: "SOL";
        USDC: "USDC";
        USDT: "USDT";
    }>;
    address: z.ZodString;
    network: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=crypto.validator.d.ts.map