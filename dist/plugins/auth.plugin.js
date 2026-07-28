import fp from 'fastify-plugin';
import { authGuard } from '../middlewares/auth.middleware.js';
export const authPlugin = fp(async (fastify) => {
    fastify.decorate('authenticate', authGuard);
});
//# sourceMappingURL=auth.plugin.js.map