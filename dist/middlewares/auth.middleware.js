import { verifyToken } from '../utils/index.js';
export async function authGuard(request, reply) {
    const header = request.headers['authorization'];
    if (!header || !header.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
    const token = header.slice(7);
    try {
        request.user = verifyToken(token);
    }
    catch {
        return reply.status(401).send({ error: 'Invalid or expired token' });
    }
}
export function roleGuard(...roles) {
    return async (request, reply) => {
        if (!request.user || !roles.includes(request.user.role)) {
            return reply.status(403).send({ error: 'Forbidden' });
        }
    };
}
//# sourceMappingURL=auth.middleware.js.map