import 'dotenv/config';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cookie from '@fastify/cookie';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './cores/logger/index.js';
import { registerPageRoutes, registerAuthRoutes, registerShiftRoutes, registerCryptoRoutes, registerPublicRoutes, registerProductRoutes, registerSaleRoutes, registerCustomerRoutes } from './routes/index.js';
import { getDb } from './databases/index.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({ logger: true });
fastify.register(cookie);
fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/',
});
fastify.register(registerPageRoutes);
fastify.register(registerAuthRoutes);
fastify.register(registerShiftRoutes);
fastify.register(registerCryptoRoutes);
fastify.register(registerPublicRoutes);
fastify.register(registerProductRoutes);
fastify.register(registerSaleRoutes);
fastify.register(registerCustomerRoutes);
const start = async () => {
    try {
        const port = parseInt(process.env['PORT'] ?? '3000', 10);
        const superadminEmail = process.env['SUPERADMIN_EMAIL'] ?? 'admin@zudo.app';
        const superadminPassword = process.env['SUPERADMIN_PASSWORD'] ?? 'Admin@12345';
        const existing = await getDb().user.findUnique({ where: { email: superadminEmail } });
        if (!existing) {
            const passwordHash = await bcrypt.hash(superadminPassword, 12);
            const pinHash = await bcrypt.hash('0000', 10);
            await getDb().user.create({
                data: {
                    email: superadminEmail,
                    passwordHash,
                    pinHash,
                    firstName: 'Super',
                    lastName: 'Admin',
                    role: 'SUPERADMIN',
                    isActive: true,
                    emailVerified: true,
                },
            });
            logger.info(`Superadmin seeded: ${superadminEmail}`);
        }
        await fastify.listen({ port });
        logger.info(`Zudo POS server running at http://localhost:${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map