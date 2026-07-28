import { getDb } from '../databases/index.js';
export async function createAuditLog(data) {
    return getDb().auditLog.create({ data });
}
//# sourceMappingURL=AdminAuditLog.model.js.map