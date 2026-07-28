export declare class CryptoApiClient {
    private coingeckoUrl;
    private btcExplorerUrl;
    private ethExplorerUrl;
    private ethApiKey;
    constructor();
    getBtcRate(): Promise<number>;
    verifyTx(txHash: string, currency: string): Promise<{
        confirmed: boolean;
        confirmations: number;
    }>;
}
export declare const cryptoApi: CryptoApiClient;
//# sourceMappingURL=crypto.client.d.ts.map