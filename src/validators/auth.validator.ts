import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email().max(255).transform(v => v.toLowerCase().trim()),
  password: z.string().min(6).max(128),
  firstName: z.string().min(1).max(100).transform(v => v.trim()),
  lastName: z.string().min(1).max(100).transform(v => v.trim()),
  businessName: z.string().min(1).max(200).transform(v => v.trim()).optional(),
})

export const loginSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  password: z.string().min(1),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
})

export const resetPasswordSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  otp: z.string().length(6),
  newPassword: z.string().min(6).max(128),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6).max(128),
})

export const sendOtpSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  type: z.enum(['password_reset', 'pin_reset', 'pin_change', 'email_verification']),
})

export const verifyOtpSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  code: z.string().length(6),
  type: z.enum(['password_reset', 'pin_reset', 'pin_change', 'email_verification']),
})

export const setupPinSchema = z.object({
  pin: z.string().length(4).regex(/^\d{4}$/),
})

export const changePinSchema = z.object({
  currentPin: z.string().length(4).regex(/^\d{4}$/),
  newPin: z.string().length(4).regex(/^\d{4}$/),
})

export const forgotPinSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  otp: z.string().length(6),
  newPin: z.string().length(4).regex(/^\d{4}$/),
})

export const adminChangeStaffPinSchema = z.object({
  staffId: z.string().uuid(),
  newPin: z.string().length(4).regex(/^\d{4}$/),
})
