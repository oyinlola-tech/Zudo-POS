import type { User, Business } from '@prisma/client'

export type SafeUser = Omit<User, 'passwordHash' | 'pinHash'>
export type AuthResult = { token: string; user: SafeUser }
export type AuthPayload = { userId: string; email: string; role: string; businessId: string | null }

export type RegisterCommandInput = { email: string; password: string; firstName: string; lastName: string; phone?: string; businessName?: string }
export type RegisterCommandOutput = AuthResult

export type LoginCommandInput = { email: string; password: string }
export type LoginCommandOutput = AuthResult

export type GetSessionQueryInput = { token: string }
export type GetSessionQueryOutput = SafeUser | null

export type GetProfileQueryInput = { userId: string }
export type GetProfileQueryOutput = SafeUser & { business: Business | null }

export type SendOtpCommandInput = { userId: string; email: string; type: string }
export type SendOtpCommandOutput = { message: string }

export type VerifyOtpCommandInput = { userId: string; code: string; type: string }
export type VerifyOtpCommandOutput = { valid: boolean }

export type ForgotPasswordCommandInput = { email: string }
export type ForgotPasswordCommandOutput = { message: string }

export type ResetPasswordCommandInput = { email: string; otp: string; newPassword: string }
export type ResetPasswordCommandOutput = { message: string }

export type ChangePasswordCommandInput = { userId: string; currentPassword: string; newPassword: string }
export type ChangePasswordCommandOutput = { message: string }

export type ChangePinCommandInput = { userId: string; currentPin: string; newPin: string }
export type ChangePinCommandOutput = { message: string }

export type ForgotPinCommandInput = { email: string; otp: string; newPin: string }
export type ForgotPinCommandOutput = { message: string }