export type AuditAction = 'LOGIN' | 'LOGOUT' | 'REGISTER' | 'SHIFT_START' | 'SHIFT_END' | 'SALE' | 'SALE_VOID' | 'RETURN' | 'PIN_CHANGE' | 'PASSWORD_CHANGE' | 'PRODUCT_CREATE' | 'PRODUCT_UPDATE' | 'PRODUCT_DELETE' | 'CUSTOMER_CREATE' | 'CUSTOMER_UPDATE' | 'USER_CREATE' | 'USER_UPDATE' | 'SETTINGS_CHANGE' | 'CRYPTO_WALLET_UPDATE' | 'CRYPTO_PAYMENT';
export declare function createAuditLog(data: {
    userId: string;
    action: AuditAction;
    entity?: string;
    entityId?: string;
    details?: string;
    ip?: string;
    userAgent?: string;
}): Promise<{
    id: string;
    userId: string;
    action: string;
    entity: string | null;
    entityId: string | null;
    details: string | null;
    ip: string | null;
    userAgent: string | null;
    createdAt: Date;
}>;
//# sourceMappingURL=AdminAuditLog.model.d.ts.map