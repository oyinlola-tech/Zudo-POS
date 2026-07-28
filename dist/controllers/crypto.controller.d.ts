import type { FastifyRequest, FastifyReply } from 'fastify';
import type { GenerateQrResponse, WalletsResponse } from '../dtos/index.js';
export declare function generateQrHandler(request: FastifyRequest, reply: FastifyReply): Promise<GenerateQrResponse | {
    error: string;
}>;
export declare function getWalletsHandler(request: FastifyRequest, reply: FastifyReply): Promise<WalletsResponse>;
export declare function upsertWalletHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function confirmPaymentHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function adminChangeStaffPinHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=crypto.controller.d.ts.map