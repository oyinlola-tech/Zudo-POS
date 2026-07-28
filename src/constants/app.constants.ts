export const JWT_SECRET = process.env['JWT_SECRET'] ?? 'fallback-secret'
export const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] ?? '7d'
export const OTP_EXPIRY_MINUTES = 10
export const OTP_LENGTH = 6
export const BCRYPT_ROUNDS = 12
export const BCRYPT_PIN_ROUNDS = 10