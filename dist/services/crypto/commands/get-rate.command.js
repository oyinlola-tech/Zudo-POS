const CRYPTO_RATES = {
    BTC: 98000000,
    ETH: 5200000,
    USDT: 1550,
    USDC: 1550,
    BNB: 420000,
    SOL: 95000,
};
export class GetCryptoRateCommand {
    async execute(input) {
        const rate = CRYPTO_RATES[input.currency];
        if (!rate)
            throw new Error(`Unsupported currency: ${input.currency}`);
        return {
            currency: input.currency,
            rate,
            cryptoAmount: parseFloat((input.amountNgn / rate).toFixed(8)),
        };
    }
}
//# sourceMappingURL=get-rate.command.js.map