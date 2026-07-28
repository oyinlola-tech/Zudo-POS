export declare class PaymentApiClient {
    private baseUrl;
    private apiKey;
    constructor();
    verifyTransaction(reference: string): Promise<unknown>;
    initiatePayment(data: {
        amount: number;
        currency: string;
        email: string;
        callbackUrl: string;
    }): Promise<unknown>;
}
export declare const paymentApi: PaymentApiClient;
//# sourceMappingURL=payment.client.d.ts.map