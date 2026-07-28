import bcrypt from 'bcryptjs';
import { BCRYPT_ROUNDS } from '../../../constants/index.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { otpRepository } from '../../../repositories/otp.repository.js';
import { getDb } from '../../../databases/index.js';
export class ResetPasswordCommand {
    async execute(input) {
        const user = await userRepository.findByEmail(input.email);
        if (!user) {
            return { message: 'Invalid or expired OTP' };
        }
        const otp = await otpRepository.findValid(user.id, input.otp, 'password_reset');
        if (!otp) {
            return { message: 'Invalid or expired OTP' };
        }
        const passwordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);
        await userRepository.update(user.id, { passwordHash });
        await otpRepository.markUsed(otp.id);
        await otpRepository.invalidateUserOtps(user.id, 'password_reset');
        return { message: 'Password reset successfully' };
    }
}
//# sourceMappingURL=reset-password.command.js.map