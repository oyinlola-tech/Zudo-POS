import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ActiveShiftResponse, ShiftHistoryResponse } from '../dtos/index.js';
export declare function startShiftHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function endShiftHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function activeShiftHandler(request: FastifyRequest, reply: FastifyReply): Promise<ActiveShiftResponse | {
    error: string;
}>;
export declare function shiftHistoryHandler(request: FastifyRequest, reply: FastifyReply): Promise<ShiftHistoryResponse | {
    error: string;
}>;
//# sourceMappingURL=shift.controller.d.ts.map