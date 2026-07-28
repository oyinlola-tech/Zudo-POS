import { authService } from '../services/index.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema, sendOtpSchema, verifyOtpSchema, changePinSchema, forgotPinSchema, adminChangeStaffPinSchema, cryptoWalletSchema, } from '../validators/index.js';
import { cryptoRepository } from '../repositories/crypto.repository.js';
export async function registerHandler(request, reply) {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    try {
        const result = await authService.commands.register.execute(parsed.data);
        return reply.status(201).send(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed';
        return reply.status(409).send({ error: message });
    }
}
export async function loginHandler(request, reply) {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    try {
        const result = await authService.commands.login.execute(parsed.data);
        return reply.send(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        return reply.status(401).send({ error: message });
    }
}
export async function sessionHandler(request, reply) {
    const token = request.headers['authorization']?.startsWith('Bearer ')
        ? request.headers['authorization'].slice(7)
        : '';
    const user = await authService.queries.getSession.execute({ token });
    if (!user)
        return reply.status(401).send({ error: 'Invalid session' });
    return reply.send({ user });
}
export async function profileHandler(request, reply) {
    if (!request.user)
        return reply.status(401).send({ error: 'Unauthorized' });
    const profile = await authService.queries.getProfile.execute({
        userId: request.user.userId,
    });
    if (!profile)
        return reply.status(404).send({ error: 'User not found' });
    return reply.send(profile);
}
export async function forgotPasswordHandler(request, reply) {
    const parsed = forgotPasswordSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    const result = await authService.commands.forgotPassword.execute(parsed.data);
    return reply.send(result);
}
export async function resetPasswordHandler(request, reply) {
    const parsed = resetPasswordSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    const result = await authService.commands.resetPassword.execute(parsed.data);
    return reply.send(result);
}
export async function changePasswordHandler(request, reply) {
    if (!request.user)
        return reply.status(401).send({ error: 'Unauthorized' });
    const parsed = changePasswordSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    try {
        const result = await authService.commands.changePassword.execute({
            userId: request.user.userId,
            ...parsed.data,
        });
        return reply.send(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Change password failed';
        return reply.status(400).send({ error: message });
    }
}
export async function sendOtpHandler(request, reply) {
    const parsed = sendOtpSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    const { email, type } = parsed.data;
    const { userRepository } = await import('../repositories/user.repository.js');
    const user = await userRepository.findByEmail(email);
    if (!user) {
        return reply.send({ message: 'If the email exists, an OTP has been sent' });
    }
    const result = await authService.commands.sendOtp.execute({
        userId: user.id,
        email: user.email,
        type,
    });
    return reply.send(result);
}
export async function verifyOtpHandler(request, reply) {
    const parsed = verifyOtpSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    const { email, code, type } = parsed.data;
    const { userRepository } = await import('../repositories/user.repository.js');
    const user = await userRepository.findByEmail(email);
    if (!user)
        return reply.status(400).send({ error: 'Invalid request' });
    const result = await authService.commands.verifyOtp.execute({
        userId: user.id,
        code,
        type,
    });
    if (!result.valid)
        return reply.status(400).send({ error: 'Invalid or expired OTP' });
    return reply.send({ message: 'OTP verified successfully' });
}
export async function setupPinHandler(request, reply) {
    if (!request.user)
        return reply.status(401).send({ error: 'Unauthorized' });
    const { setupPinSchema } = await import('../validators/index.js');
    const parsed = setupPinSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    try {
        const result = await authService.commands.setupPin.execute({
            userId: request.user.userId,
            pin: parsed.data.pin,
        });
        return reply.send(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Setup PIN failed';
        return reply.status(400).send({ error: message });
    }
}
export async function changePinHandler(request, reply) {
    if (!request.user)
        return reply.status(401).send({ error: 'Unauthorized' });
    const parsed = changePinSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    try {
        const result = await authService.commands.changePin.execute({
            userId: request.user.userId,
            ...parsed.data,
        });
        return reply.send(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Change PIN failed';
        return reply.status(400).send({ error: message });
    }
}
export async function forgotPinHandler(request, reply) {
    const parsed = forgotPinSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Validation failed',
            details: parsed.error.flatten().fieldErrors,
        });
    }
    const result = await authService.commands.forgotPin.execute(parsed.data);
    return reply.send(result);
}
//# sourceMappingURL=auth.controller.js.map