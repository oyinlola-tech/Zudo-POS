import bcrypt from 'bcryptjs';
import { BCRYPT_ROUNDS } from '../../../constants/index.js';
import { userRepository } from '../../../repositories/user.repository.js';
import { getDb } from '../../../databases/index.js';
import { UserRole, BusinessPlan, BusinessStatus } from '../../../enums/index.js';
import { generateToken, sanitizeUser } from '../../../utils/index.js';
export class RegisterCommand {
    async execute(input) {
        const existing = await userRepository.findByEmail(input.email);
        if (existing) {
            throw new Error('A user with this email already exists');
        }
        const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
        const user = await getDb().$transaction(async (tx) => {
            const slug = input.businessName
                ?.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '') +
                '-' +
                Date.now().toString(36);
            const business = await tx.business.create({
                data: {
                    name: input.businessName ?? `${input.firstName}'s Business`,
                    slug,
                    plan: BusinessPlan.FREE,
                    status: BusinessStatus.TRIAL,
                    trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                },
            });
            const newUser = await tx.user.create({
                data: {
                    email: input.email,
                    passwordHash,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    phone: input.phone ?? null,
                    role: UserRole.OWNER,
                    businessId: business.id,
                },
                include: { business: true },
            });
            return newUser;
        });
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            businessId: user.businessId,
        });
        return { token, user: sanitizeUser(user) };
    }
}
//# sourceMappingURL=register.command.js.map