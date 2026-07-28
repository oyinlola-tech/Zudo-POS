import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AuthResponse, MessageResponse, ValidationErrorResponse, SessionResponse } from '../dtos/index.js';
export declare function registerHandler(request: FastifyRequest, reply: FastifyReply): Promise<AuthResponse | ValidationErrorResponse>;
export declare function loginHandler(request: FastifyRequest, reply: FastifyReply): Promise<AuthResponse | ValidationErrorResponse>;
export declare function sessionHandler(request: FastifyRequest, reply: FastifyReply): Promise<SessionResponse | {
    error: string;
}>;
export declare function profileHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function forgotPasswordHandler(request: FastifyRequest, reply: FastifyReply): Promise<MessageResponse | ValidationErrorResponse>;
export declare function resetPasswordHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function changePasswordHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function sendOtpHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function verifyOtpHandler(request: FastifyRequest, reply: FastifyReply): Promise<MessageResponse | ValidationErrorResponse>;
export declare function setupPinHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function changePinHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function forgotPinHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=auth.controller.d.ts.map