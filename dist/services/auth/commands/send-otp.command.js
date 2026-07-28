import crypto from 'crypto';
import { OTP_EXPIRY_MINUTES } from '../../../constants/index.js';
import { otpRepository } from '../../../repositories/otp.repository.js';
import { mailService } from '../../index.js';
export class SendOtpCommand {
    async execute(input) {
        await otpRepository.invalidateUserOtps(input.userId, input.type);
        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
        await otpRepository.create({
            userId: input.userId,
            code,
            type: input.type,
            expiresAt,
        });
        await mailService.commands.sendOtpMail.execute({
            to: input.email,
            code,
            type: input.type,
        });
        return { message: 'OTP sent successfully' };
    }
}
//# sourceMappingURL=send-otp.command.js.map