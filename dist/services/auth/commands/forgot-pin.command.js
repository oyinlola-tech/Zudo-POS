import bcrypt from 'bcryptjs';
import { BCRYPT_PIN_ROUNDS } from '../../../constants/index.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { otpRepository } from '../../../repositories/otp.repository.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class ForgotPinCommand {
    async execute(input) {
        const user = await userRepository.findByEmail(input.email);
        if (!user)
            return { message: 'Invalid or expired OTP' };
        const otp = await otpRepository.findValid(user.id, input.otp, 'pin_reset');
        if (!otp)
            return { message: 'Invalid or expired OTP' };
        const pinHash = await bcrypt.hash(input.newPin, BCRYPT_PIN_ROUNDS);
        await userRepository.update(user.id, { pinHash });
        await otpRepository.markUsed(otp.id);
        await otpRepository.invalidateUserOtps(user.id, 'pin_reset');
        await createAuditLog({
            userId: user.id,
            action: 'PIN_CHANGE',
        });
        return { message: 'PIN reset successfully' };
    }
}
//# sourceMappingURL=forgot-pin.command.js.map