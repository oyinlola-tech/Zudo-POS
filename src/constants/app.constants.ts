import { createLogger } from '../cores/logger/index.js'

const logger = createLogger('Constants')

const secret = process.env['JWT_SECRET']
if (!secret) {
  logger.error('JWT_SECRET environment variable is required. Set it in .env or environment.')
  process.exit(1)
}

export const JWT_SECRET = secret
export const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] ?? '7d'
export const OTP_EXPIRY_MINUTES = 10
export const OTP_LENGTH = 6
export const BCRYPT_ROUNDS = 12
export const BCRYPT_PIN_ROUNDS = 10