import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../constants/app.constants.js'

const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] }

export function generateToken(payload: { userId: string; email: string; role: string; businessId: string | null }): string {
  return jwt.sign(payload, JWT_SECRET, signOptions)
}

export function verifyToken(token: string): { userId: string; email: string; role: string; businessId: string | null } {
  return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string; businessId: string | null }
}