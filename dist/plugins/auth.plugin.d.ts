import type { FastifyInstance } from 'fastify';
import { authGuard } from '../middlewares/auth.middleware.js';
export declare const authPlugin: (fastify: FastifyInstance) => Promise<void>;
declare module 'fastify' {
    interface FastifyInstance {
        authenticate: typeof authGuard;
    }
}
//# sourceMappingURL=auth.plugin.d.ts.map