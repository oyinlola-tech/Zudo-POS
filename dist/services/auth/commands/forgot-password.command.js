import { userRepository } from '../../../repositories/user.repository.js';
import { SendOtpCommand } from './send-otp.command.js';
export class ForgotPasswordCommand {
    async execute(input) {
        const user = await userRepository.findByEmail(input.email);
        if (!user) {
            return { message: 'If the email exists, an OTP has been sent' };
        }
        await new SendOtpCommand().execute({
            userId: user.id,
            email: user.email,
            type: 'password_reset',
        });
        return { message: 'If the email exists, an OTP has been sent' };
    }
}
//# sourceMappingURL=forgot-password.command.js.map