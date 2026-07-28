import { z } from 'zod';
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    phone: z.string().optional(),
    businessName: z.string().min(1, 'Business name is required').max(200),
});
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});
export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});
export const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    otp: z.string().length(6, 'OTP must be 6 digits'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});
export const sendOtpSchema = z.object({
    email: z.string().email('Invalid email address'),
    type: z.enum(['password_reset', 'pin_reset', 'pin_change', 'email_verification']),
});
export const verifyOtpSchema = z.object({
    email: z.string().email('Invalid email address'),
    code: z.string().length(6, 'OTP must be 6 digits'),
    type: z.enum(['password_reset', 'pin_reset', 'pin_change', 'email_verification']),
});
export const changePinSchema = z.object({
    currentPin: z.string().length(4, 'PIN must be 4 digits'),
    newPin: z.string().length(4, 'PIN must be 4 digits'),
});
export const forgotPinSchema = z.object({
    email: z.string().email('Invalid email address'),
    otp: z.string().length(6, 'OTP must be 6 digits'),
    newPin: z.string().length(4, 'PIN must be 4 digits'),
});
export const setupPinSchema = z.object({
    pin: z.string().length(4, 'PIN must be 4 digits'),
});
export const adminChangeStaffPinSchema = z.object({
    staffId: z.string().uuid('Invalid staff ID'),
    newPin: z.string().length(4, 'New PIN must be 4 digits'),
});
//# sourceMappingURL=auth.validator.js.map