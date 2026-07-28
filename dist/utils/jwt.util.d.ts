export declare function generateToken(payload: {
    userId: string;
    email: string;
    role: string;
    businessId: string | null;
}): string;
export declare function verifyToken(token: string): {
    userId: string;
    email: string;
    role: string;
    businessId: string | null;
};
//# sourceMappingURL=jwt.util.d.ts.map