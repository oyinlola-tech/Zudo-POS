import { otpRepository } from '../../../repositories/otp.repository.js';
export class VerifyOtpCommand {
    async execute(input) {
        const otp = await otpRepository.findValid(input.userId, input.code, input.type);
        if (!otp)
            return { valid: false };
        await otpRepository.markUsed(otp.id);
        return { valid: true };
    }
}
//# sourceMappingURL=verify-otp.command.js.map