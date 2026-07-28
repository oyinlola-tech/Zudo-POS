export class PaymentApiClient {
    baseUrl;
    apiKey;
    constructor() {
        this.baseUrl = process.env['PAYMENT_API_URL'] ?? '';
        this.apiKey = process.env['PAYMENT_API_KEY'] ?? '';
    }
    async verifyTransaction(reference) {
        if (!this.baseUrl)
            throw new Error('PAYMENT_API_URL not configured');
        const res = await fetch(`${this.baseUrl}/transactions/${reference}`, {
            headers: { Authorization: `Bearer ${this.apiKey}` },
        });
        if (!res.ok)
            throw new Error(`Payment verification failed: ${res.status}`);
        return res.json();
    }
    async initiatePayment(data) {
        if (!this.baseUrl)
            throw new Error('PAYMENT_API_URL not configured');
        const res = await fetch(`${this.baseUrl}/payments/initiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error(`Payment initiation failed: ${res.status}`);
        return res.json();
    }
}
export const paymentApi = new PaymentApiClient();
//# sourceMappingURL=payment.client.js.map