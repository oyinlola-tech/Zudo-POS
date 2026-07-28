import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { buildDatabaseUrl } from '../configs/db.config.js';
let prisma;
export function getDb() {
    if (!prisma) {
        const url = buildDatabaseUrl();
        const adapter = new PrismaLibSql({ url });
        prisma = new PrismaClient({ adapter });
    }
    return prisma;
}
export async function disconnectDb() {
    if (prisma)
        await prisma.$disconnect();
}
//# sourceMappingURL=prisma.client.js.map