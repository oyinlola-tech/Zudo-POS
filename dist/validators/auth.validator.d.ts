import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    businessName: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const resetPasswordSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const sendOtpSchema: z.ZodObject<{
    email: z.ZodString;
    type: z.ZodEnum<{
        email_verification: "email_verification";
        password_reset: "password_reset";
        pin_change: "pin_change";
        pin_reset: "pin_reset";
    }>;
}, z.core.$strip>;
export declare const verifyOtpSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
    type: z.ZodEnum<{
        email_verification: "email_verification";
        password_reset: "password_reset";
        pin_change: "pin_change";
        pin_reset: "pin_reset";
    }>;
}, z.core.$strip>;
export declare const changePinSchema: z.ZodObject<{
    currentPin: z.ZodString;
    newPin: z.ZodString;
}, z.core.$strip>;
export declare const forgotPinSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
    newPin: z.ZodString;
}, z.core.$strip>;
export declare const setupPinSchema: z.ZodObject<{
    pin: z.ZodString;
}, z.core.$strip>;
export declare const adminChangeStaffPinSchema: z.ZodObject<{
    staffId: z.ZodString;
    newPin: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validator.d.ts.map