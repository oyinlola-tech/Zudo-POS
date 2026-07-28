import bcrypt from 'bcryptjs';
import { BCRYPT_PIN_ROUNDS } from '../../../constants/index.js';
import { userRepository } from '../../../repositories/user.repository.js';
export class SetupPinCommand {
    async execute(input) {
        const pinHash = await bcrypt.hash(input.pin, BCRYPT_PIN_ROUNDS);
        await userRepository.update(input.userId, { pinHash });
        return { message: 'PIN set successfully' };
    }
}
//# sourceMappingURL=setup-pin.command.js.map