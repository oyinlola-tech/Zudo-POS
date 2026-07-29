import { getDb } from '../databases/index.js'

export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'REGISTER'
  | 'SHIFT_START'
  | 'SHIFT_END'
  | 'SALE'
  | 'SALE_VOID'
  | 'RETURN'
  | 'PIN_CHANGE'
  | 'PASSWORD_CHANGE'
  | 'PRODUCT_CREATE'
  | 'PRODUCT_UPDATE'
  | 'PRODUCT_DELETE'
  | 'CUSTOMER_CREATE'
  | 'CUSTOMER_UPDATE'
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'SETTINGS_CHANGE'
  | 'CRYPTO_WALLET_UPDATE'
  | 'CRYPTO_PAYMENT'
  | 'CUSTOMER_DELETE'
  | 'USER_DELETE'

export async function createAuditLog(data: {
  userId: string
  action: AuditAction
  entity?: string
  entityId?: string
  details?: string
  ip?: string
  userAgent?: string
}) {
  return getDb().auditLog.create({ data })
}
