import bcrypt from 'bcryptjs';
import { BCRYPT_PIN_ROUNDS } from '../../../constants/index.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { createAuditLog } from '../../../models/AdminAuditLog.model.js';
export class AdminChangeStaffPinCommand {
    async execute(input) {
        const admin = await userRepository.findById(input.adminId);
        if (!admin)
            throw new Error('Admin not found');
        if (!admin.businessId)
            throw new Error('Admin has no business assigned');
        const roles = ['OWNER', 'ADMIN', 'MANAGER'];
        if (!roles.includes(admin.role)) {
            throw new Error('Only owners, admins, and managers can change staff PINs');
        }
        const staff = await userRepository.findById(input.staffId);
        if (!staff)
            throw new Error('Staff not found');
        if (staff.businessId !== admin.businessId) {
            throw new Error('Staff does not belong to your business');
        }
        const pinHash = await bcrypt.hash(input.newPin, BCRYPT_PIN_ROUNDS);
        await userRepository.update(input.staffId, { pinHash });
        await createAuditLog({
            userId: input.adminId,
            action: 'PIN_CHANGE',
            entity: 'User',
            entityId: input.staffId,
            details: `Admin ${admin.email} changed PIN for ${staff.email}`,
        });
        return { message: `PIN updated successfully for ${staff.firstName} ${staff.lastName}` };
    }
}
//# sourceMappingURL=admin-change-staff-pin.command.js.map