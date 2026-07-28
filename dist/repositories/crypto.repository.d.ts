export declare const cryptoRepository: {
    getWallets(businessId: string): Promise<{
        id: string;
        businessId: string;
        currency: string;
        address: string;
        network: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    upsertWallet(data: {
        businessId: string;
        currency: string;
        address: string;
        network?: string;
    }): Promise<{
        id: string;
        businessId: string;
        currency: string;
        address: string;
        network: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createPayment(data: {
        businessId: string;
        saleId?: string;
        currency: string;
        amount: number;
        amountUsd?: number;
        walletAddress: string;
    }): Promise<{
        id: string;
        businessId: string;
        saleId: string | null;
        currency: string;
        amount: number;
        amountUsd: number | null;
        walletAddress: string;
        txHash: string | null;
        status: string;
        confirmations: number | null;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePayment(id: string, data: {
        txHash?: string;
        status?: string;
        confirmations?: number;
        paidAt?: Date;
    }): Promise<{
        id: string;
        businessId: string;
        saleId: string | null;
        currency: string;
        amount: number;
        amountUsd: number | null;
        walletAddress: string;
        txHash: string | null;
        status: string;
        confirmations: number | null;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=crypto.repository.d.ts.map