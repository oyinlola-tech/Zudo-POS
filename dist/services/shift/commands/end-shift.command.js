import bcrypt from 'bcryptjs';
import { shiftRepository } from '../../../repositories/shift.repository.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class EndShiftCommand {
    async execute(input) {
        const user = await userRepository.findById(input.userId);
        if (!user)
            throw new Error('User not found');
        if (!user.pinHash)
            throw new Error('PIN not set');
        const valid = await bcrypt.compare(input.pin, user.pinHash);
        if (!valid)
            throw new Error('Invalid PIN');
        const active = await shiftRepository.findActiveByUser(input.userId);
        if (!active)
            throw new Error('No active shift found');
        const closed = await shiftRepository.close(active.id, input.endCash, input.notes);
        await createAuditLog({
            userId: input.userId,
            action: 'SHIFT_END',
            entityId: active.id,
            details: `End cash: ${input.endCash}, Diff: ${closed.cashDiff}`,
        });
        return { message: 'Shift ended successfully', shiftId: active.id };
    }
}
//# sourceMappingURL=end-shift.command.js.map