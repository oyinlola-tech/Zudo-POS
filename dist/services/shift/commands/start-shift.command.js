import bcrypt from 'bcryptjs';
import { shiftRepository } from '../../../repositories/shift.repository.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class StartShiftCommand {
    async execute(input) {
        const user = await userRepository.findById(input.userId);
        if (!user)
            throw new Error('User not found');
        if (!user.pinHash)
            throw new Error('PIN not set. Please set up your PIN first.');
        const valid = await bcrypt.compare(input.pin, user.pinHash);
        if (!valid)
            throw new Error('Invalid PIN');
        const active = await shiftRepository.findActiveByUser(input.userId);
        if (active)
            throw new Error('You already have an active shift. End it first.');
        const shift = await shiftRepository.create({
            userId: input.userId,
            businessId: input.businessId,
            startCash: input.startCash,
        });
        await createAuditLog({
            userId: input.userId,
            action: 'SHIFT_START',
            entityId: shift.id,
        });
        return { message: 'Shift started successfully', shiftId: shift.id };
    }
}
//# sourceMappingURL=start-shift.command.js.map