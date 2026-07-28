import type { FastifyRequest, FastifyReply } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            userId: string;
            email: string;
            role: string;
            businessId: string | null;
        };
    }
}
export declare function authGuard(request: FastifyRequest, reply: FastifyReply): Promise<undefined>;
export declare function roleGuard(...roles: string[]): (request: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map