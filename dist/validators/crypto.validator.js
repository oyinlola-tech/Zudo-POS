import { z } from 'zod';
export const cryptoWalletSchema = z.object({
    currency: z.enum(['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL']),
    address: z.string().min(10, 'Invalid wallet address').max(200),
    network: z.string().optional(),
});
//# sourceMappingURL=crypto.validator.js.map